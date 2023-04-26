import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


import "../assets/style_login.css";

export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [IsSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {

            const response = await axios.post('http://localhost:3000/signup', { username, password });
            if (response.data.success) {
                console.log(response.data.message);// sucesso no login
                setIsSignup(true);// faça algo para redirecionar o usuário para a página de sucesso do login
                
            } else {
                console.log(response.data.message); // falha no login
                setError(response.data.message);// exiba uma mensagem de erro para o usuário
            }
        } catch (error) {
            console.error(error);
            setError('Ocorreu um erro durante o signup. Por favor, tente novamente.');
        }
    };

    if (IsSignup === true) {
        return <Navigate to="/dashboard"/>;
    }


    return (
        <div className="login-container">
            <h1 className="login-title">Register</h1>
            {error && <div className="error-message">{error}</div>} {/* exibe uma mensagem de erro, se houver */}
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="login-label">
                    Username:
                    <input
                        className="login-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label className="login-label">
                    Password:
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit" onClick={handleRegister} className="login-button">
                    Register
                </button>
            </form>
        </div>
    );
}