import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const shuffleResults = () => {
    const shuffled = [...results].sort(() => Math.random() - 0.5);
    setResults(shuffled);
    setShuffle(!shuffle);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Semantic Search</h1>
        <p className="subtitle">by Alessio Benincasa - Aspiring AI Software Engineer Intern at LinkUp</p>
      </header>
      
      <main>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        
        {loading && <div className="loading-spinner">🔄 Searching...</div>}
        {error && <div className="error-message">{error}</div>}

        {results.length > 0 && (
          <>
            <button onClick={shuffleResults} className="shuffle-button">
              {shuffle ? '🔄 Reset Order' : '🎲 Shuffle Results'}
            </button>
            <div className="results">
              {results.map((result, index) => (
                <div key={index} className="result-item">
                  <h3>{result.title}</h3>
                  <a href={result.link} target="_blank" rel="noopener noreferrer">Read More</a>
                  <p>Similarity: {result.similarity.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
