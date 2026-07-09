import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const isAuthenticated = !!token;

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

  async function login(loginData) {
        const data = await loginUser(loginData);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    }

    function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    }

    const value = {
        token,
        user,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };

export default AuthContext;