import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

function App() {
  const num = 8;
  const [features, setFeatures] = useState(Array(num).fill(''));
  const [featureNames, setFeatureNames] = useState(Array(num).fill(`F`));
  const [result, setResult] = useState('');
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load feature names from CSV
    fetch("/dap.csv")
      .then((response) => response.text())
      .then((text) => {
        const rows = text.trim().split("\n").map(row => row.split(","));
        if (rows.length > 1) {
          setFeatureNames(rows[0].slice(0));
        }
      })
      .catch((error) => {
        console.error("Error loading features:", error);
        setError("Couldn't load feature names. Using default labels.");
      });
    
    // Load prediction history from localStorage
    const savedHistory = localStorage.getItem('predictionHistory');
    if (savedHistory) {
      setPredictionHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('predictionHistory', JSON.stringify(predictionHistory));
  }, [predictionHistory]);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const resetForm = () => {
    setFeatures(Array(num).fill(''));
    setResult('');
    setError('');
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (features.some(f => f === '')) {
      setError('Please fill in all input fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: features.map(Number),
      });
      
      const prediction = response.data.prediction;
      setResult(prediction);
      
      // Add to history with timestamp and input values
      const historyEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        features: [...features],
        prediction: prediction
      };
      
      setPredictionHistory(prev => [historyEntry, ...prev].slice(0, 10)); // Keep only the 10 most recent
    } catch (error) {
      console.error('Error:', error);
      setError('Error in prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = (id) => {
    setPredictionHistory(prev => prev.filter(item => item.id !== id));
  };

  const loadFromHistory = (historyItem) => {
    setFeatures(historyItem.features);
    setResult(historyItem.prediction);
  };

  const clearAllHistory = () => {
    setPredictionHistory([]);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Parkinson's Disease Prediction</h1>
        <div className={styles.tabs}>
          <button 
            className={!showHistory ? styles.activeTab : styles.tab} 
            onClick={() => setShowHistory(false)}
          >
            Prediction
          </button>
          <button 
            className={showHistory ? styles.activeTab : styles.tab} 
            onClick={() => setShowHistory(true)}
          >
            History {predictionHistory.length > 0 && `(${predictionHistory.length})`}
          </button>
        </div>
      </header>

      {!showHistory ? (
        <div className={styles.predictionPanel}>
          <div className={styles.instructions}>
            <p>Enter the {num} input values below to predict Parkinson's disease likelihood:</p>
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.grid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.inputGroup}>
                <label>{featureNames[index] || `F${index + 1}`}</label>
                <input
                  type="number"
                  value={feature}
                  placeholder="Enter value"
                  onChange={(e) => handleChange(index, e.target.value)}
                  className={styles.input}
                />
              </div>
            ))}
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              className={styles.resetButton} 
              onClick={resetForm}
            >
              Reset
            </button>
            <button 
              className={styles.predictButton} 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Predict'}
            </button>
          </div>
          
          {result && (
            <div className={`${styles.resultBox} ${result === 'Positive' ? styles.positive : styles.negative}`}>
              <h3>Prediction Result:</h3>
              <p className={styles.resultText}>{result}</p>
              <p className={styles.resultDescription}>
                {result === 'Positive' 
                  ? 'The model predicts a likelihood of Parkinson\'s disease. Please consult with a healthcare professional.'
                  : 'The model predicts a lower likelihood of Parkinson\'s disease.'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.historyPanel}>
          <div className={styles.historyHeader}>
            <h2>Prediction History</h2>
            {predictionHistory.length > 0 && (
              <button 
                className={styles.clearButton} 
                onClick={clearAllHistory}
              >
                Clear All
              </button>
            )}
          </div>
          
          {predictionHistory.length === 0 ? (
            <div className={styles.emptyHistory}>
              <p>No prediction history available yet.</p>
              <p>Make a prediction to see it here.</p>
            </div>
          ) : (
            <div className={styles.historyList}>
              {predictionHistory.map((item) => (
                <div 
                  key={item.id} 
                  className={`${styles.historyItem} ${item.prediction === 'Positive' ? styles.historyPositive : styles.historyNegative}`}
                >
                  <div className={styles.historyInfo}>
                    <span className={styles.historyTimestamp}>{item.timestamp}</span>
                    <span className={styles.historyResult}>Result: <strong>{item.prediction}</strong></span>
                  </div>
                  
                  <div className={styles.historyFeatures}>
                    {item.features.map((value, idx) => (
                      <div key={idx} className={styles.historyFeature}>
                        <span>{featureNames[idx] || `F${idx + 1}`}: </span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.historyActions}>
                    <button 
                      className={styles.loadButton} 
                      onClick={() => loadFromHistory(item)}
                    >
                      Load
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => deleteHistoryItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <footer className={styles.footer}>
        <p>© 2025 Parkinson's Disease Prediction Tool</p>
      </footer>
    </div>
  );
}

export default App;