"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState({ subject: "", predicate: "", object: "", graph: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const fetchResults = async (cursor = null) => {
    setLoading(true);
    setError(null);
    setExecutionTime(null);

    try {
      const startTime = performance.now();

      const url = new URL("/api/quads", "https://quads1.ew.r.appspot.com/api/quads");
      url.searchParams.set("subject", query.subject);
      url.searchParams.set("predicate", query.predicate);
      url.searchParams.set("object", query.object);
      url.searchParams.set("graph", query.graph);

      if (cursor) {
        url.searchParams.set("cursor", cursor);
      }

      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      setResults(prevResults => [...prevResults, ...(data.results || [])]);

      setNextCursor(data.nextCursor || null);

      setExecutionTime((performance.now() - startTime).toFixed(2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (nextCursor) {
      fetchResults(nextCursor);
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
          Data Query
        </h2>
        <p style={{ fontSize: "1rem", margin: 0 }}>
          Query data using the quad pattern
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
        <label style={{ display: "block", marginBottom: "10px" }}>
          <strong>graph:</strong>
          <input
            type="text"
            name="graph"
            value={query.graph}
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
          onClick={() => fetchResults()}
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
          Query
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
          Query Results:
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
              <p>
                <strong>Graph:</strong> {result.graph || "No graph available"}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {nextCursor && (
        <button
          onClick={loadMoreResults}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}