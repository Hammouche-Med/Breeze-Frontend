import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./tools/PrivateRoute.js";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      {/*routing start*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute Component={Home} />} exact />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/*routing end*/}
    </div>
  );
}

export default App;
