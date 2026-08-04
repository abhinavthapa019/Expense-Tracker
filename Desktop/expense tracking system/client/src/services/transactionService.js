import api from "./api";

export async function getTransactions() {
    const response = await api.get("/transactions");

    return response.data;
}

export async function getTransaction(id) {
    const response = await api.get(`/transactions/${id}`);

    return response.data;
}

export async function createTransaction(data) {
    const response = await api.post("/transactions", data);

    return response.data;
}

export async function updateTransaction(id, data) {
    const response = await api.put(`/transactions/${id}`, data);

    return response.data;
}

export async function deleteTransaction(id) {
    const response = await api.delete(`/transactions/${id}`);

    return response.data;
}