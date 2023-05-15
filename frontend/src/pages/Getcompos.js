import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Composition = () => {
  const [episodeId, setEpisodeId] = useState('');
  const [composition, setComposition] = useState(null);

  const handleInputChange = (event) => {
    setEpisodeId(event.target.value);
  };

  const fetchComposition = async () => {
    try {
      const response = await axios.get('/getcomposition', {
        params: {
          episode_id: episodeId
        }
      });
      const compositionData = response.data;
      setComposition(compositionData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchComposition();
  };

  return (
    <div>
      <h1>Composição</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Episode ID:
          <input type="text" value={episodeId} onChange={handleInputChange} />
        </label>
        <button type="submit">Fetch Composition</button>
      </form>
      {composition ? (
        <pre>{JSON.stringify(composition, null, 2)}</pre>
      ) : (
        <p>No composition fetched yet.</p>
      )}
    </div>
  );
};

export default Composition;

