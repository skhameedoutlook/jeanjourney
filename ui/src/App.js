import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import mainLogo from "./logo_white.png.webp"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg first-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={mainLogo} alt={"Jean Journey"} className="main-logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link nav-link-color" aria-current="page" href="#">REGISTER/LOGIN</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-color" aria-current="page" href="#">
                  <i class="bi bi-heart"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-color" aria-current="page" href="#">
                  <i class="bi bi-cart2"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-color disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control right-0 right-border-0" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-danger left-border-0" type="submit">
                <i class="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
