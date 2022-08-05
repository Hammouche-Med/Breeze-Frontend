import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ( ) => {

    let loggedIn = false

    return loggedIn ? <Outlet /> : <Navigate to="/login" />;

}

export default PrivateRoute