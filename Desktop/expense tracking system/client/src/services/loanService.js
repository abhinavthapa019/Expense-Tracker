import api from "./api";

export async function getLoans() {
    const response = await api.get("/loans");

    return response.data;
}

export async function getLoan(id) {
    const response = await api.get(`/loans/${id}`);

    return response.data;
}

export async function createLoan(data) {
    const response = await api.post("/loans", data);

    return response.data;
}

export async function deleteLoan(id) {
    const response = await api.delete(`/loans/${id}`);

    return response.data;
}

export async function repayLoan(id, amount) {
    const response = await api.post(`/loans/${id}/repay`, {
        amount,
    });
    return response.data;
}