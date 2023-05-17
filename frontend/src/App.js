//Pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Formu from "./pages/Forms";


import Mapeamento from "./pages/Map";
import GetComposition from "./pages/Getcompos";



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
          
          <Route path="/" caseSensitive={false} element={<Home />} />

          <Route path="/readExcel" caseSensitive={false} element={<Mapeamento />} />
          <Route path="/findjson" caseSensitive={false} element={<GetComposition />} />
          
        </Routes>

      </StyledContainer>
    </Router>
  );
}

export default App;
