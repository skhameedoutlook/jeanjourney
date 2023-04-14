import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import mainLogo from "./logo_white.png.webp"

function App() {
  return (
    <div className="App">
	<nav class="navbar navbar-expand-lg bg-body-tertiary first-nav">
  <div className="container-fluid">
    <div>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
	  <div className="row">
	  <div className="col">
	<li className="nav-item">
	  <img src={mainLogo} className="main-logo" />
	</li>
	  </div>
	  <div className="col">
	<form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
	  </div>
	  <div className="col">
        <li class="nav-item">
          <a class="nav-link nav-link-color" aria-current="page" href="#">LOGIN / REGISTER</a>
        </li>
        <li class="nav-item">
          <a className="nav-link nav-link-color" href="#">Liked</a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-link-color">Cart</a>
        </li>
	<li class="nav-item">
	  <a className="nav-link nav-link-color">Amount</a> 
	</li>
	  </div>
	  </div>
      </ul>
    </div>
  </div>
</nav>

    	<h3>Jean Journey</h3>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />}></Route>
		</Routes>
	</BrowserRouter>
    </div>
  );
}

export default App;
