import Header from "../components/Header";
import {useRequestProjects} from "../hooks/useRequestProjects";
import {useEffect, useState} from "react";
import ProjectsTable from "../components/ProjectsTable";
import {Box} from "@mui/material";
import {useDeleteSingleProject} from "../hooks/useDeleteSingleProject";
import {useRefreshSingleProject} from "../hooks/useRefreshSingleRepository";
import ProjectCreate from "../components/ProjectCreate";
import {useCreateSingleProject} from "../hooks/useCreateSingleProject";

export const RepositoriesPage = () => {
    const {handleRequestProjects, loading} = useRequestProjects();
    const {handleCreateSingleProject, error: createError} = useCreateSingleProject();
    const {handleDeleteProject} = useDeleteSingleProject();
    const {handleRefreshProject} = useRefreshSingleProject();
    const [projectsList, setProjectsList] = useState([]);

    const fetchProjectsList = async () => {
        try {
            const list = await handleRequestProjects();
            setProjectsList(list?.data);
        } catch (e) {
            console.log('Projects list fetch error', e);
        }
    }

    const handleCreateSingleProjectAndUpdate = async (name) => {
        try {
            await handleCreateSingleProject(name);

            await fetchProjectsList()
        } catch (e) {
            console.error('Create project error', e);
        }
    }

    const handleDeleteAndUpdate = async (projectId: string) => {
        try {
            await handleDeleteProject(projectId);
            setProjectsList(prev => prev.filter(project => project.id !== projectId));
        } catch (e) {
            console.error('Delete project error', e);
        }
    };

    const handleRefreshAndUpdate = async (projectId: string) => {
        try {
            const updatedProject = await handleRefreshProject(projectId);

            setProjectsList(prev =>
                prev.map(project =>
                    project.id === updatedProject?.data?.id ? updatedProject?.data : project
                )
            );
        } catch (e) {
            console.error('Refresh project error', e);
        }
    };

    useEffect(() => {
        fetchProjectsList();
    }, []);

    return <Box>
        <Header/>

        <ProjectCreate onCreate={handleCreateSingleProjectAndUpdate} createError={createError}/>
        <ProjectsTable
            handleDeleteProject={handleDeleteAndUpdate}
            handleRefreshProject={handleRefreshAndUpdate}
            projects={projectsList}
            loading={loading}/>
    </Box>
}

export default RepositoriesPage
