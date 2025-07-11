import apiClient from "../apiClient";
import {RegisterAccountDto} from "../types/auth.types";

export const registerAccount = (context: RegisterAccountDto) => apiClient.post('/auth/register', context);

export const loginAccount = async (context) => {
    const response = await apiClient.post('/auth/login', context);

    return response.data;
}
