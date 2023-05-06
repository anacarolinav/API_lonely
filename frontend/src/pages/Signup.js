import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <form action="/signup" method="post" className="form">
      <label>Username:
        <input type="text" name="username" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>Email:
        <input type="text" name="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>Password:
        <input type="password" name="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Signup</button>
    </form>
  );
}
export default Signup;


///npm start