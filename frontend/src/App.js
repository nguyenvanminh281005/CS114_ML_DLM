import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const num = 8;
  const [features, setFeatures] = useState(Array(num).fill(''));
  const [featureNames, setFeatureNames] = useState(Array(num).fill(`F`));
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch("/dap.csv") // Thay đường dẫn file CSV của bạn
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split("\n").map(row => row.split(","));
        if (rows.length > 1) {
          setFeatureNames(rows[0].slice(0)); // Lấy dòng đầu làm tên feature, giới hạn số lượng
        }
      })
      .catch((error) => console.error("Error loading features:", error));
  }, []);

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
            <label>{featureNames[index] || `F${index + 1}`  } </label>
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