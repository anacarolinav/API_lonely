import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


import "../assets/style_login.css";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {

      
      const response = await axios.post('http://localhost:3000/login', { username, password });
      console.log(response)
      if (response.data.success) {
        console.log(response.data.message);// sucesso no login
        setIsLoggedIn(true);// faça algo para redirecionar o usuário para a página de sucesso do login
      } else {
        console.log(response.data.message); // falha no login
        setError(response.data.message);// exiba uma mensagem de erro para o usuário
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro durante o login. Por favor, tente novamente.');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard"/>;
  }
  

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
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
        <button type="submit" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

