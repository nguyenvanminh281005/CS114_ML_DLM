# how to create req file -> pip freeze > requirements.txt
# how to install req file -> pip install -r requirements.txt


from flask import Flask
from flask_cors import CORS
import joblib
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

# Load model
try:
    model = joblib.load('E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend/model/parkinsons_xgboost_model.pkl')
    scaler = joblib.load('E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend/model/scaler.pkl')
    # Lưu vào app.config để sử dụng trong toàn bộ ứng dụng
    app.config['MODEL'] = model
    app.config['SCALER'] = scaler
except Exception as e:
    print(f"Error loading model: {str(e)}")

# Đăng ký blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(prediction_bp)

if __name__ == '__main__':
    app.run(debug=True)