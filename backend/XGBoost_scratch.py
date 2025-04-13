import numpy as np
from sklearn.datasets import make_regression

def compute_gradients(y_true, y_pred):
    grad = y_pred - y_true
    hess = np.ones_like(grad)
    return grad, hess

class TreeNode:
    def __init__(self, depth=0, max_depth=3):
        self.left = None
        self.right = None
        self.feature_index = None
        self.threshold = None
        self.value = None  # chỉ dùng khi là leaf
        self.depth = depth
        self.max_depth = max_depth

def build_tree(X, g, h, depth, max_depth, lam, gamma):
    node = TreeNode(depth=depth, max_depth=max_depth)

    # Nếu max depth hoặc số mẫu nhỏ, tạo leaf
    if depth >= max_depth or X.shape[0] <= 1:
        node.value = -np.sum(g) / (np.sum(h) + lam)
        return node

    best_gain = -np.inf
    best_split = None

    for feature_index in range(X.shape[1]):
        thresholds = np.unique(X[:, feature_index])
        for t in thresholds:
            left_idx = X[:, feature_index] <= t
            right_idx = ~left_idx

            if np.sum(left_idx) == 0 or np.sum(right_idx) == 0:
                continue

            GL, HL = np.sum(g[left_idx]), np.sum(h[left_idx])
            GR, HR = np.sum(g[right_idx]), np.sum(h[right_idx])

            gain = 0.5 * (GL**2 / (HL + lam) + GR**2 / (HR + lam) - (GL + GR)**2 / (HL + HR + lam)) - gamma

            if gain > best_gain:
                best_gain = gain
                best_split = (feature_index, t, left_idx, right_idx)

    if best_gain <= 0 or best_split is None:
        node.value = -np.sum(g) / (np.sum(h) + lam)
        return node

    f_idx, t, left_idx, right_idx = best_split
    node.feature_index = f_idx
    node.threshold = t
    node.left = build_tree(X[left_idx], g[left_idx], h[left_idx], depth + 1, max_depth, lam, gamma)
    node.right = build_tree(X[right_idx], g[right_idx], h[right_idx], depth + 1, max_depth, lam, gamma)
    return node

def predict_tree(x, node):
    if node.value is not None:
        return node.value
    if x[node.feature_index] <= node.threshold:
        return predict_tree(x, node.left)
    else:
        return predict_tree(x, node.right)
    
class XGBoostRegressor:
    def __init__(self, n_estimators=10, max_depth=3, learning_rate=0.1, lam=1, gamma=0):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.lr = learning_rate
        self.lam = lam
        self.gamma = gamma
        self.trees = []

    def fit(self, X, y):
        y_pred = np.zeros_like(y, dtype=float)

        for _ in range(self.n_estimators):
            g, h = compute_gradients(y, y_pred)
            tree = build_tree(X, g, h, 0, self.max_depth, self.lam, self.gamma)
            self.trees.append(tree)

            # Cập nhật dự đoán
            update = np.array([predict_tree(x, tree) for x in X])
            y_pred += self.lr * update

    def predict(self, X):
        y_pred = np.zeros(X.shape[0])
        for tree in self.trees:
            y_pred += self.lr * np.array([predict_tree(x, tree) for x in X])
        return y_pred
    

import numpy as np
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

# Dùng mô hình bạn vừa cài: XGBoostRegressor
# Giả sử đã có các hàm: compute_gradients, build_tree, predict_tree, TreeNode và class XGBoostRegressor như ở trên

# 1. Tạo bộ dữ liệu toy
X, y = make_regression(n_samples=100, n_features=1, noise=15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Huấn luyện mô hình
model = XGBoostRegressor(n_estimators=10, max_depth=3, learning_rate=0.1, lam=1.0, gamma=0)
model.fit(X_train, y_train)

# 3. Dự đoán
y_pred = model.predict(X_test)

# 4. Đánh giá
mse = mean_squared_error(y_test, y_pred)
print(f"MSE of my scratch: {mse:.2f}")

# # 5. Vẽ kết quả
# plt.scatter(X_test, y_test, color='blue', label='Ground Truth')
# plt.scatter(X_test, y_pred, color='red', label='Predicted')
# plt.legend()
# plt.title("XGBoostRegressor (tự cài) trên dữ liệu toy")
# plt.show()

import xgboost

xgb = xgboost.XGBRegressor(n_estimators=10, max_depth=3, learning_rate=0.1, gamma=0)
xgb.fit(X_train, y_train)
y_pred_xgb = xgb.predict(X_test)
mse_xgb = mean_squared_error(y_test, y_pred_xgb)
print(f"MSE of xgboost: {mse_xgb:.2f}")