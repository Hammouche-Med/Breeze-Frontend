import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./tools/PrivateRoute.js";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound.js";

import Users from "./pages/users/Users.js";
import AddUser from "./pages/users/AddUser.js";
import EditUser from "./pages/users/EditUser";
import ResetPassword from "./pages/users/ResetPassword";

import Regions from "./pages/regions/Regions.js";
import AddRegion from "./pages/regions/AddRegion.js";
import EditRegion from "./pages/regions/EditRegion.js";

import Stations from "./pages/stations/Stations.js";
import AddStation from "./pages/stations/AddStation.js";
import EditStation from "./pages/stations/EditStation.js";
import StationsMap from "./pages/stations/StationsMap.js";


function App() {
  return ( 
    <div className="App">
      {/*routing start*/}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>} />

            <Route path="/users" element={<PrivateRoute> <Users/> </PrivateRoute>} />
            <Route path="/users/create" element={<PrivateRoute> <AddUser/> </PrivateRoute>} />
            <Route path="/users/edit" element={<PrivateRoute> <EditUser/> </PrivateRoute>} />
            <Route path="/users/reset-password" element={<PrivateRoute> <ResetPassword/> </PrivateRoute>} />

            <Route path="/regions" element={<PrivateRoute> <Regions/> </PrivateRoute>} />
            <Route path="/regions/create" element={<PrivateRoute> <AddRegion/> </PrivateRoute>} />
            <Route path="/regions/edit" element={<PrivateRoute> <EditRegion/> </PrivateRoute>} />

            <Route path="/stations" element={<PrivateRoute> <Stations/> </PrivateRoute>} />
            <Route path="/stations-map" element={<PrivateRoute> <StationsMap/> </PrivateRoute>} />
            <Route path="/stations/create" element={<PrivateRoute> <AddStation/> </PrivateRoute>} />
            <Route path="/stations/edit" element={<PrivateRoute> <EditStation/> </PrivateRoute>} />

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
