import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Composition = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [composition, setComposition] = useState(null);
  const [error, setError] = useState(null);
  const [formMessage, setFormMessage] = useState('');

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const fetchComposition = async () => {
    try {
      const response = await axios.get(`/findjson/:username/${id}`);
      const compositionData = response.data;
      setComposition(compositionData);
      setError(null);
      setFormMessage('');
    } catch (error) {
      setComposition(null);
      setError('Error: ' + error.message);
      setFormMessage('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchComposition();
  };

  useEffect(() => {
    if (composition) {
      navigate("/forms", { state: composition });
    } else if (error) {
      setFormMessage(error);
    } else {
      setFormMessage("The form with this ID is not associated with your profile.");
    }
  }, [composition, error, navigate]);

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '45px', textAlign: 'center', padding: '5px', marginBottom: '18px' }}>Episodes</h1>

      <form onSubmit={handleSubmit}>
        <label style={{ color: 'white', fontSize: '24px' }}>
          Episode ID:
        </label>
        <input type="text" value={id} onChange={handleInputChange} style={{ marginRight: '12px' }} />
        <button type="submit" style={{ color: 'white', fontSize: '24px', cursor: 'pointer', marginLeft: '8px' }}>Search the episode ID</button>
      </form>

      {formMessage ? (
        <p style={{ color: 'white', fontSize: '24px', marginTop: '15px' }}>{formMessage}</p>
      ) : null}
    </div>
  );
};

export default Composition;



