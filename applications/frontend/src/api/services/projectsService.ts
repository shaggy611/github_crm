import apiClient from "../apiClient";

export const requestProjects = async () => await apiClient.get('/repo/repositories-list');

export const createSingleProject = (context) => apiClient.post('/repo/create-repository', context);

export const deleteSingleProject = (id) => apiClient.post('/repo/delete-repository', id);

export const refreshSingleProject = (id) => apiClient.post('/repo/refresh-repository', id);

