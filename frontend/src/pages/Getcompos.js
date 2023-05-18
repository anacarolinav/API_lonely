import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Composition = () => {
  const [id, setId] = useState('');
  const [composition, setComposition] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const fetchComposition = async () => {
    try {
      const response = await axios.get(`/findjson/${id}`);
      const compositionData = response.data;
      setComposition(compositionData);
      setError(null);
    } catch (error) {
      setComposition('');
      setError('Error: ' + error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchComposition();
  };

  useEffect(() => {
        if (Object.keys(composition).length > 0) {
            window.location.href = '/forms';
        }
    }, [composition]);

  return (
    <div>
      <h1>Composição</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Episode ID:
          <input type="text" value={id} onChange={handleInputChange} />
        </label>
        <button type="submit">Fetch Composition</button>
      </form>
      {error ? (
        <p>{error}</p>
      ) : composition ? (
        <pre>{JSON.stringify(composition, null, 2)}</pre>
      ) : (
        <p>No composition fetched yet.</p>
      )}
    </div>
  );
};

export default Composition;




