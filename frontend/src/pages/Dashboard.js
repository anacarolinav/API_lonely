import React from 'react';
import { Avatar, StyledButton, ButtonGroup } from "../components/Styles";

// Logo
import Logo from '../assets/logo.png';

function Dashboard() {
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
      <h2 style={{ color:'white',fontSize: '45px', textAlign: 'center', padding: '5px' }}>Welcome, doctor admin</h2>
        <ButtonGroup>
          <StyledButton to="/">Logout</StyledButton>
          <StyledButton to="/savejson">Upload excel from a patient</StyledButton>
          <StyledButton to="/findjson">See the form from a patient</StyledButton>
          <StyledButton to="/alljson">Get all compos from the db</StyledButton>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default Dashboard;
