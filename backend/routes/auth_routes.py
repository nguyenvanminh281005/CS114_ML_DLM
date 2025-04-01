from flask import Blueprint, request, jsonify, current_app
from utils.auth_ultils import (
    load_users, save_users, generate_token, decode_token, 
    generate_password_reset_token, get_username_from_reset_token, remove_reset_token
)
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import mail
from flask_mail import Message

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ('username', 'email', 'password')):
        return jsonify({'error': 'Thiếu thông tin đăng ký'}), 400
    
    users = load_users()
    
    # Check if user already exists
    if data['username'] in users:
        return jsonify({'error': 'Tên đăng nhập đã tồn tại'}), 400
    
    # Check if email already exists
    for user in users.values():
        if user['email'] == data['email']:
            return jsonify({'error': 'Email đã được sử dụng'}), 400
    
    # Create new user
    users[data['username']] = {
        'email': data['email'],
        'password': generate_password_hash(data['password'])
    }
    
    save_users(users)
    
    # Generate token
    token = generate_token(data['username'])
    
    return jsonify({
        'message': 'Đăng ký thành công',
        'token': token,
        'username': data['username']
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ('username', 'password')):
        return jsonify({'error': 'Thiếu thông tin đăng nhập'}), 400
    
    users = load_users()
    
    # Check if user exists
    if data['username'] not in users:
        return jsonify({'error': 'Tên đăng nhập hoặc mật khẩu không đúng'}), 401
    
    user = users[data['username']]
    
    # Check password
    if not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Tên đăng nhập hoặc mật khẩu không đúng'}), 401
    
    # Generate token
    token = generate_token(data['username'])
    
    return jsonify({
        'message': 'Đăng nhập thành công',
        'token': token,
        'username': data['username']
    }), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    # Validate input
    if 'email' not in data:
        return jsonify({'error': 'Vui lòng cung cấp email'}), 400
    
    users = load_users()
    user_found = None
    username_found = None
    
    # Find user by email
    for username, user in users.items():
        if user['email'] == data['email']:
            user_found = user
            username_found = username
            break
    
    if not user_found:
        return jsonify({'error': 'Email không tồn tại trong hệ thống'}), 404
    
    # Generate reset token
    reset_token = generate_password_reset_token(username_found)
    
    # Send email with reset link
    try:
        reset_url = f"{current_app.config['FRONTEND_URL']}/reset-password?token={reset_token}"
        msg = Message(
            'Yêu cầu đặt lại mật khẩu',
            recipients=[data['email']]
        )
        msg.body = f'''Để đặt lại mật khẩu, vui lòng truy cập đường dẫn sau:
{reset_url}

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
'''
        mail.send(msg)
    except Exception as e:
        print(f"Email error: {str(e)}")
        return jsonify({'error': 'Không thể gửi email'}), 500
    
    return jsonify({'message': 'Email hướng dẫn đặt lại mật khẩu đã được gửi'}), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ('token', 'new_password')):
        return jsonify({'error': 'Thiếu thông tin đặt lại mật khẩu'}), 400
    
    # Check if token is valid
    username = get_username_from_reset_token(data['token'])
    if not username:
        return jsonify({'error': 'Token không hợp lệ hoặc đã hết hạn'}), 400
    
    users = load_users()
    
    # Update password
    users[username]['password'] = generate_password_hash(data['new_password'])
    save_users(users)
    
    # Remove used token
    remove_reset_token(data['token'])
    
    return jsonify({'message': 'Mật khẩu đã được đặt lại thành công'}), 200

@auth_bp.route('/me', methods=['GET'])
def get_user_profile():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Token không hợp lệ'}), 401
    
    token = auth_header.split(' ')[1]
    username = decode_token(token)
    
    if isinstance(username, str) and (username.endswith('đăng nhập lại.') or username.endswith('Vui lòng đăng nhập lại.')):
        return jsonify({'error': username}), 401
    
    users = load_users()
    
    if username not in users:
        return jsonify({'error': 'Người dùng không tồn tại'}), 404
    
    user = users[username]
    
    return jsonify({
        'username': username,
        'email': user['email']
    }), 200