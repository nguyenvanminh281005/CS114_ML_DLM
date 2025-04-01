import os

class Config:
    # Cấu hình chung
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')
    JWT_EXPIRATION_TIME = 3600  # Token hết hạn sau 1 giờ
    
    # Cấu hình email
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', 'your-email@gmail.com')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'your-app-password')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', 'your-email@gmail.com')
    
    # Cấu hình database
    USER_DB_FILE = 'users.json'
    
    # Cấu hình frontend
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')