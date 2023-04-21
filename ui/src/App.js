import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import mainLogo from "./logo_white.png.webp"
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-md first-nav">
        <div className="container-fluid">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav me-auto">
              <li className="nav-item active">
                  <a className="nav-link" href="#">
                    <img src={mainLogo} alt={"Logo"} className="main-logo" />
                  </a>
              </li>
            </ul>
          </div>
          <div className="mx-auto order-0">
            <a className="navbar-brand mx-auto nav-link-color" href="#">LOGIN/REGISTER</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".dual-collapse2">
                <span className="navbar-toggler-icon nav-link-color">
                  <i class="bi bi-list"></i>
                </span>
            </button>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link nav-link-color" href="#"><i className="bi bi-heart"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link nav-link-color" href="#"><i className="bi bi-cart"></i></a>
                </li>
            </ul>
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
