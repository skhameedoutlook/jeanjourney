import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
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
