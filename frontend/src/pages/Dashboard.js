import React, { useState, useEffect } from 'react';
import { Avatar, StyledButton, ButtonGroup } from "../components/Styles";
import axios from 'axios';
// Logo
import Logo from '../assets/logo.png';

function Dashboard() {
  const [username, setUsername] = useState(""); // Estado para armazenar o nome de usuário


  const fetchUser = async () => {
    try {
      const response = await axios.get(`/username`); // Substitua pelo endpoint real para obter os dados do usuário
      const user = response.data;
      setUsername(user.username); // Atualiza o estado com o nome de usuário
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]); // Adicione [username] como dependência


  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "transparent",
          width: "100%",
          padding: "15px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Avatar image={Logo} />
      </div>
      <form style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '20px' }}>
        <h2 style={{ color: 'white', fontSize: '45px', textAlign: 'center', padding: '5px' }}>Welcome, doctor {username}</h2>
        <ButtonGroup>
          <StyledButton to="/savejson">Upload excel from a patient</StyledButton>
          <StyledButton to="/findjson">See the form from a patient</StyledButton>
          <StyledButton to="/alljson">Get all compos from the db</StyledButton>
          <StyledButton to="/data">See statistics of the clinic's patients</StyledButton>
        </ButtonGroup>
      </form>
      <div style={{ marginTop: '105px', display: 'flex', justifyContent: 'center' }}>
        <StyledButton to="/">Logout</StyledButton>
      </div>
    </div>
  );
}

export default Dashboard;
