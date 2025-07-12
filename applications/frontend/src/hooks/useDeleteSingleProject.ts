import {useState} from "react";
import {deleteSingleProject} from "../api/services/projectsService";

export function useDeleteSingleProject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteProject = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            await deleteSingleProject({id});
        } catch (err: any) {
            setError(err.response?.data?.message || 'Project deletion error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteProject, loading, error };
}
