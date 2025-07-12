import {useState} from "react";
import {createSingleProject} from "../api/services/projectsService";

export function useCreateSingleProject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateSingleProject = async (name: string) => {
        setLoading(true);
        setError(null);

        try {
            return await createSingleProject({name});
        } catch (err: any) {
            setError(err.response?.data?.message || 'Project creation error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateSingleProject, loading, error };
}
