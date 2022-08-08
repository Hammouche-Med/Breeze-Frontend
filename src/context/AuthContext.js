import jwtDecode from "jwt-decode";
import { createContext, useState } from "react"

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(()=> localStorage.getItem('Token') ? JSON.parse(localStorage.getItem('token')) : null) 
    const [user, setUser] = useState(()=> localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null)

    return (
        <AuthContext.Provider value={{user,setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;