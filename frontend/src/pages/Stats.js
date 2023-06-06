import React from 'react';
import "../style.css";
import { StyledButton, ButtonGroup } from "../components/Styles";


const App = () => {
  return (

    <div>
      <div>
        <ButtonGroup>
          <StyledButton to="/stats1">Averages of the provenance of babies</StyledButton>
          <StyledButton to="/stats2">Distribution of Babies' Entry Dates</StyledButton>
          <StyledButton to="/stats3">1st most common reasons for hospitalization of babies</StyledButton>
          <StyledButton to="/stats4">General distribution of weight and age of babies</StyledButton>
        </ButtonGroup>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
        <StyledButton to="/dashboard" style={{ marginTop: "100px" }}>
          Back
        </StyledButton>
      </div>
    </div>


  );
};

export default App;
