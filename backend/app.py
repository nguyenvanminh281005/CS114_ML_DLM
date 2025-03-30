# how to create req file -> pip freeze > requirements.txt
# how to install req file -> pip install -r requirements.txt


from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Cho phép truy cập từ React

# Load model
model = joblib.load('E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend/model/parkinsons_xgboost_model.pkl')
scaler = joblib.load('E:/KHTN2023/CS114/CS114_ML_DLM/CS114_ML_DLM/backend/model/scaler.pkl')
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received Data:", data)  # In dữ liệu nhận được

        features = np.array([data['features']])
        print("Processed Features:", features)  # In dữ liệu đầu vào model
        features = scaler.transform(features)
        
        prediction = model.predict(features)[0]
        result = "Parkinson's Detected" if prediction == 1 else "Healthy"
        
        print("Prediction Result:", result)  # In kết quả dự đoán
        
        return jsonify({'prediction': result})
    except Exception as e:
        print("Error:", str(e))  # In lỗi nếu có
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
