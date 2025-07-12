import {useState} from "react";
import {loginAccount} from "../api/services/authService";
import {RegisterAccountDto} from "../api/types/auth.types";
import {useNavigate} from "react-router-dom";

export function useLoginAccount() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (data: RegisterAccountDto) => {
        setLoading(true);
        setError(null);

        try {
            const response =  await loginAccount(data);
            navigate('/');

            return response;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
}
