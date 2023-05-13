//Pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Formu from "./pages/Forms";
import Dict from "./pages/Dict";

import Excel from "./pages/map";

import AiAi from "./pages/aiai";

//Styled components
import { StyledContainer } from "./components/Styles";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  return (
    <Router>
      <StyledContainer>
        <Routes>

          <Route path="/signup" caseSensitive={false} element={<SignupPage />} />
          <Route path="/login" caseSensitive={false} element={<LoginPage />} />
          <Route path="/dashboard" caseSensitive={false} element={<Dashboard />} />
          <Route path="/forms" caseSensitive={false} element={<Formu />} />
          <Route path="/dict" caseSensitive={false} element={<Dict />} />
          <Route path="/" caseSensitive={false} element={<Home />} />

          <Route path="/readexcel" caseSensitive={false} element={<Excel />} />
          <Route path="/aiai" caseSensitive={false} element={<AiAi />} />
          
        </Routes>

      </StyledContainer>
    </Router>
  );
}

export default App;
