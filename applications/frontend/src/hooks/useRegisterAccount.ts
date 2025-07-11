import {useState} from "react";
import {registerAccount} from "../api/services/authService";
import {RegisterAccountDto} from "../api/types/auth.types";
import {useNavigate} from "react-router-dom";

export function useRegisterAccount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (data: RegisterAccountDto) => {
        setLoading(true);
        setError(null);

        try {
            const response = await registerAccount(data);

            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleRegister, loading, error };
}
