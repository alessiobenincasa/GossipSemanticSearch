import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setResults([]);

    if (!query) {
      setError("Please enter a query.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        query: query,
      });
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch results. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Gossip Semantic Search</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter your search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            marginRight: "10px",
            fontSize: "16px",
          }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Search
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>{" "}
            (Similarity: {result.similarity.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
