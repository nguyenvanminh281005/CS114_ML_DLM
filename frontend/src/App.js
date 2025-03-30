import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

function App() {
  const num = 8;
  const [features, setFeatures] = useState(Array(num).fill(''));
  const [featureNames, setFeatureNames] = useState(Array(num).fill(`F`));
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch("/dap.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split("\n").map(row => row.split(","));
        if (rows.length > 1) {
          setFeatureNames(rows[0].slice(0));
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
    <div className={styles.container}>
      <h2>Parkinson's Prediction</h2>
      <p>Nhập {num} giá trị đầu vào:</p>
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.inputGroup}>
            <label>{featureNames[index] || `F${index + 1}`}</label>
            <input
              type="number"
              value={feature}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleSubmit}>Predict</button>
      {result && <h3 className={styles.result}>Prediction: {result}</h3>}
    </div>
  );
}

export default App;
