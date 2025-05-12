import pandas as pd
import numpy as np
import optuna
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier

# Đọc dữ liệu
df = pd.read_csv("D:\Document\\University\CS114\CS114_ML_DLM\data\\alzheimer_done.csv")

X = df.drop(columns=["Diagnosis"])  # status: 1 = bệnh, 0 = bình thường
y = df["Diagnosis"]


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train, X_val, y_train, y_val = train_test_split(X_scaled, y, test_size=0.2, random_state=42, stratify=y)

# Định nghĩa hàm objective cho Optuna
def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 10, 15),
        "max_depth": trial.suggest_int("max_depth", 2, 10),
        "learning_rate": trial.suggest_float("learning_rate", 1e-4, 0.5, log=True),
        "gamma": trial.suggest_float("gamma", 0, 5),
        "reg_lambda": trial.suggest_float("lambda", 1e-5, 10.0, log=True),
        "reg_alpha": trial.suggest_float("alpha", 1e-5, 10.0, log=True),
        "use_label_encoder": False,
        "eval_metric": "logloss"
    }

    model = XGBClassifier(**params)
    model.fit(X_train, y_train)
    preds = model.predict(X_val)
    acc = accuracy_score(y_val, preds)
    return 1 - acc  # Optuna sẽ minimize → minimize (1 - accuracy)

# Tối ưu
study = optuna.create_study(direction="maximize", sampler=optuna.samplers.TPESampler(seed=42))
study.optimize(objective, n_trials=50)

# Kết quả
print("Best parameters:", study.best_params)
print("Best accuracy:", 1 - study.best_value)
