import api from "./api";

export async function loginUser(userData) {
    const response = await api.post("/auth/login", userData);
    return response.data;
}

export async function register(credentials) {
    const payload = {
        username: credentials.username || credentials.name,
        email: credentials.email,
        password: credentials.password,
    };

    const response = await api.post("/auth/register", payload);
    return response.data;
}

