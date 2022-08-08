import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./tools/PrivateRoute.js";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound.js";
import Users from "./pages/users/Users.js";
import Regions from "./pages/regions/Regions.js";
import Stations from "./pages/stations/Stations.js";
import { useEffect } from "react";

function App() {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = "assets/js/sb-admin-2.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);  
      }
    }, []);
  return ( 
    <div className="App">
      {/*routing start*/}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>} />

            <Route path="/users" element={<PrivateRoute> <Users/> </PrivateRoute>} />

            <Route path="/regions" element={<PrivateRoute> <Regions/> </PrivateRoute>} />

            <Route path="/stations" element={<PrivateRoute> <Stations/> </PrivateRoute>} />

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
