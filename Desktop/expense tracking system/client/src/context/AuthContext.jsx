import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [token, setToken] = useState(null);

    const [user, setUser] = useState(null);

    const isAuthenticated = !!token;

    function login() {

    }

    function logout() {

    }

    const value = {
        token,
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };

export default AuthContext;