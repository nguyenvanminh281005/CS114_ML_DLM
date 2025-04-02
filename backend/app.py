# how to create req file -> pip freeze > requirements.txt
# how to install req file -> pip install -r requirements.txt

from flask import Flask
from flask_cors import CORS
import joblib
import os
import warnings

# Import các module
from config import Config
from routes.auth_routes import auth_bp
from routes.prediction_routes import prediction_bp
from extensions import mail

app = Flask(__name__)
CORS(app)

# Load cấu hình
app.config.from_object(Config)

# Khởi tạo extensions
mail.init_app(app)

best_model = '/model/best_model_w_grid.pkl'

# Định nghĩa đường dẫn model
# MODEL_PATH = 'E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend/model/best_model_w_grid.pkl'
MODEL_PATH = f'E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend{best_model}'
SCALER_PATH = 'E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend/model/scaler.pkl'

# Load model và scaler
try:
    if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
        raise FileNotFoundError("Model hoặc Scaler không tồn tại. Kiểm tra lại đường dẫn.")

    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
    
    app.config['MODEL'] = model
    app.config['SCALER'] = scaler
    print("✅ Model và Scaler đã load thành công!")

except Exception as e:
    print(f"❌ Lỗi khi tải model: {str(e)}")
    app.config['MODEL'] = None
    app.config['SCALER'] = None

# Đăng ký blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(prediction_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
