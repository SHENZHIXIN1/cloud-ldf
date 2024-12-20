// app/page.js
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState({ subject: '', predicate: '', object: '' });
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
      const response = await fetch(`/api/ldf?subject=${query.subject}&predicate=${query.predicate}&object=${query.object}`);

      if (!response.ok) throw new Error('Failed to fetch data');

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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>#LD - Linked Data Fragments</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Query Wikidata by triple pattern</h2>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={query.subject}
            onChange={handleInputChange}
            style={{ marginLeft: '10px', marginBottom: '10px', width: '100%' }}
          />
        </label>
        <label>
          Predicate:
          <input
            type="text"
            name="predicate"
            value={query.predicate}
            onChange={handleInputChange}
            style={{ marginLeft: '10px', marginBottom: '10px', width: '100%' }}
          />
        </label>
        <label>
          Object:
          <input
            type="text"
            name="object"
            value={query.object}
            onChange={handleInputChange}
            style={{ marginLeft: '10px', marginBottom: '10px', width: '100%' }}
          />
        </label>
        <button
          onClick={fetchResults}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Find matching triples
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {executionTime && (
        <p>
          Execution time: <strong>{executionTime} ms</strong>
        </p>
      )}

      <h3>Matches in Wikidata for:</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {results.map((result, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>Subject:</strong> {result.subject} <br />
            <strong>Predicate:</strong> {result.predicate} <br />
            <strong>Object:</strong> {result.object}
          </li>
        ))}
      </ul>
    </div>
  );
}

