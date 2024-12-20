"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState({ subject: "", predicate: "", object: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    setExecutionTime(null);

    try {
      const startTime = performance.now();
      const response = await fetch(
        `/api/ldf?subject=${query.subject}&predicate=${query.predicate}&object=${query.object}`
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setResults(data.triples || []);
      setExecutionTime((performance.now() - startTime).toFixed(2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>
          <span style={{ color: "red", fontWeight: "bold" }}>#LD</span> Linked
          Data Fragments
        </h1>
        <h2 style={{ fontSize: "1.5rem", margin: "10px 0", color: "red" }}>
          Wikidata
        </h2>
        <p style={{ fontSize: "1rem", margin: 0 }}>
          Query Wikidata by triple pattern
        </p>
      </header>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <strong>subject:</strong>
          <input
            type="text"
            name="subject"
            value={query.subject}
            onChange={handleInputChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <strong>predicate:</strong>
          <input
            type="text"
            name="predicate"
            value={query.predicate}
            onChange={handleInputChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          <strong>object:</strong>
          <input
            type="text"
            name="object"
            value={query.object}
            onChange={handleInputChange}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </label>
        <button
          onClick={fetchResults}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Find matching triples
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {executionTime && (
        <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          Execution time: <strong>{executionTime} ms</strong>
        </p>
      )}

      <section>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
          Matches in Wikidata for:
        </h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {results.map((result, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Subject:</strong> {result.subject}
              </p>
              <p>
                <strong>Predicate:</strong> {result.predicate}
              </p>
              <p>
                <strong>Object:</strong> {result.object}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
