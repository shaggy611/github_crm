import {useState} from "react";
import {refreshSingleProject} from "../api/services/projectsService";

export function useRefreshSingleProject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRefreshProject = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            return await refreshSingleProject({id});
        } catch (err: any) {
            setError(err.response?.data?.message || 'Project refresh error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleRefreshProject, loading, error };
}
