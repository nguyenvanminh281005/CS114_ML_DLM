# Trong file extensions.py
from flask_mail import Mail

mail = Mail()

# Trong file app.py
from flask import Flask
from extensions import mail

app = Flask(__name__)

# Cấu hình Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-email-password'
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'
app.config['FRONTEND_URL'] = 'http://localhost:3000'  # URL của frontend

mail.init_app(app)