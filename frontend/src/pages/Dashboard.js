import React from 'react';
import { StyledTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea, colors } from "../components/Styles";

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
      <form style={{ backgroundColor: '#f2f2f2', border: '2px solid #ccc', borderRadius: '5px', padding: '20px' }}>
      <h2 style={{ fontSize: '45px', textAlign: 'center', padding: '5px' }}>Welcome, medical user</h2>
        <ButtonGroup>
          <StyledButton to="/">Logout</StyledButton>
          <StyledButton to="/savejson">Upload an excel from a patient</StyledButton>
          <StyledButton to="/findjson">See the form from a patient</StyledButton>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default Dashboard;
