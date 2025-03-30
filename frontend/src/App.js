import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // Khởi tạo 22 ô input thay vì 4
  const num = 8;
  const [features, setFeatures] = useState(Array(num).fill(''));
  const [result, setResult] = useState('');

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: features.map(Number),
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error in prediction');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Parkinson's Prediction</h2>
      <p>Nhập {num} giá trị đầu vào:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', justifyContent: 'center', maxWidth: '400px', margin: 'auto' }}>
        {features.map((feature, index) => (
          <div key={index}>
            <label>F{index + 1}: </label>
            <input
              type="number"
              value={feature}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Predict</button>
      {result && <h3>Prediction: {result}</h3>}
    </div>
  );
}

export default App;