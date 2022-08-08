import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./tools/PrivateRoute.js";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <div className="App">
      {/*routing start*/}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/*routing end*/}
    </div>
  );
}

export default App;
