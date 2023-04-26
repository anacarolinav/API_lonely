import { useState } from 'react';
import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup } from "../components/Styles";

// Logo
import Logo from '../assets/logo.png';

const Dashboard = () => {
  const [showForms, setShowForms] = useState(false);

  return (
    <div>
      <nav
        style={{
          backgroundColor: "#333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          color: "#fff",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
        }}
      >
        <div>
          <Avatar image={Logo} size={50} />
        </div>
        <div>
          <ButtonGroup>
            <StyledButton to="/forms" onClick={() => setShowForms(true)}>Formulários</StyledButton>
          </ButtonGroup>
        </div>
      </nav>
      <div style={{ 
        marginTop: "70px",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <StyledTitle size={65}>Welcome to React App</StyledTitle>
        <StyledSubTitle size={27}>Feel free to explore our page</StyledSubTitle>
        {showForms && (
          <div style={{ marginTop: "20px" }}>
            {/* Aqui você pode adicionar seus formulários */}
            <p>Formulários vão aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;