import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <form action="/login" method="post" className="form">
      <label>Username:
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;


///npm start