import {useState} from "react";
import {requestProjects} from "../api/services/projectsService";

export function useRequestProjects() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequestProjects = async () => {
        setLoading(true);
        setError(null);

        try {
            return await requestProjects();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Projects request error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleRequestProjects, loading, error };
}
