//Pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Formu from "./pages/Forms";


import Mapeamento from "./pages/Mapeamento";
import GetComposition from "./pages/Getcompos";
import AllCompos from "./pages/Allcompos";

import Stats from "./pages/Stats";


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

          <Route path="/savejson" caseSensitive={false} element={<Mapeamento />} />
          <Route path="/findjson" caseSensitive={false} element={<GetComposition />} />
          <Route path="/alljson" caseSensitive={false} element={<AllCompos />} />

          <Route path="/data" caseSensitive={false} element={<Stats />} />
          
        </Routes>

      </StyledContainer>
    </Router>
  );
}

export default App;
