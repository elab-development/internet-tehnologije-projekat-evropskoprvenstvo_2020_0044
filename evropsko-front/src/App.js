import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import Navigacija from "./komponente/Navigacija";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./stranice/Home";
import Drzave from "./stranice/Drzave";
import Login from "./stranice/Login";
import Utakmice from "./stranice/Utakmice";
import Tabele from "./stranice/Tabele";
import Admin from "./stranice/Admin";
import Footer from "./komponente/Footer";

function App() {
  return (
    <>
        <Navigacija />

          <Container className="glavni">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/drzave" element={<Drzave />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/rezultati" element={<Utakmice />} />
                  <Route path="/tabele" element={<Tabele />} />
                  <Route path="/admin" element={<Admin />} />
                </Routes>
              </BrowserRouter>
          </Container>
      <Footer />
    </>
  );
}

export default App;
