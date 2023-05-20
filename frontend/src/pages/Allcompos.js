import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledButton, StyledSubTitle } from '../components/Styles';

const AllCompositions = () => {
    const [compositions, setCompositions] = useState([]);
    const [selectedComposition, setSelectedComposition] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCompositions();
    }, []);

    const getCompositions = async () => {
        try {
            const response = await axios.get('/alljson');
            const compositionData = response.data;
            setCompositions(compositionData);
            setError(null);
        } catch (error) {
            setCompositions([]);
            setError('Error: ' + error.message);
        }
    };

    const handleCompositionClick = (composition) => {
        setSelectedComposition(composition);
    };

    return (
        <div>
            <h1 style={{ color: 'white', fontSize: '45px', textAlign: 'center', padding: '5px', marginBottom: '18px' }}>Episodes</h1>
            {error ? (
                <p>{error}</p>
            ) : compositions.length > 0 ? (
                <div>
                    {compositions.map((composition, index) => (
                        <StyledButton
                            key={index}
                            style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '20px', marginBottom: '10px' }}
                            onClick={() => handleCompositionClick(composition)}
                        >
                            Episode {index + 1}
                        </StyledButton>
                    ))}
                    <StyledSubTitle style={{ marginTop: '50px', fontSize:'30px'}}>Informations about the episode:</StyledSubTitle>
                    <table style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '20px', marginTop: '40px' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody style={{color:'white'}}>
                            {selectedComposition &&
                                Object.entries(selectedComposition.items).map(
                                    ([itemName, itemValue], index) => (
                                        <tr key={index}>
                                            <td>{itemName}</td>
                                            <td>{JSON.stringify(itemValue)}</td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No Episodes found.</p>
            )}
        </div>
    );
}

export default AllCompositions;



