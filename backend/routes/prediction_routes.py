from flask import Blueprint, request, jsonify, current_app
import numpy as np
import warnings

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received Data:", data)  # In dữ liệu nhận được
        
        # Lấy model và scaler từ config
        model = current_app.config.get('MODEL')
        scaler = current_app.config.get('SCALER')
        
        if model is None or scaler is None:
            return jsonify({'error': 'Model chưa được tải'}), 500
            
        features = np.array([data['features']])
        print("Processed Features:", features)  # In dữ liệu đầu vào model
        
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            features = scaler.transform(features)
        
        prediction = model.predict(features)[0]
        result = "Parkinson's Detected" if prediction == 1 else "Healthy"
        
        print("Prediction Result:", result)  # In kết quả dự đoán
        
        return jsonify({'prediction': result})
    except Exception as e:
        print("Error:", str(e))  # In lỗi nếu có
        return jsonify({'error': str(e)})