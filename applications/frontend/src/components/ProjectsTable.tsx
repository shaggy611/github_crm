import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Link, Skeleton, Box, Button
} from '@mui/material';

interface GithubProject {
    id: string;
    createdAt: string;
    updatedAt: string;
    owner: string | null;
    name: string | null;
    url: string | null;
    stars: number | null;
    forks: number | null;
    issues: number | null;
    createdAtUtc: string | number | null;
}

interface Props {
    projects: GithubProject[];
}

const ProjectsTable = ({projects, loading, handleDeleteProject, handleRefreshProject}) => {

    return (
        <>
            {
                !loading
                    ? <TableContainer component={Paper} sx={{width: '100%', mt: 5}}>
                        <Table sx={{width: '100%'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Owner</strong></TableCell>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>URL</strong></TableCell>
                                    <TableCell><strong>⭐️ Stars</strong></TableCell>
                                    <TableCell><strong>🍴 Forks</strong></TableCell>
                                    <TableCell><strong>🐛 Issues</strong></TableCell>
                                    <TableCell><strong>Repo Created At</strong></TableCell>
                                    <TableCell><strong>Added At</strong></TableCell>
                                    <TableCell align="center"><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project?.id}>
                                        <TableCell>{project?.owner ?? '—'}</TableCell>
                                        <TableCell>{project?.name ?? '—'}</TableCell>
                                        <TableCell>
                                            {project?.url ? (
                                                <Link href={project?.url} target="_blank" rel="noopener">
                                                    {project?.url}
                                                </Link>
                                            ) : '—'}
                                        </TableCell>
                                        <TableCell>{project?.stars ?? '—'}</TableCell>
                                        <TableCell>{project?.forks ?? '—'}</TableCell>
                                        <TableCell>{project?.issues ?? '—'}</TableCell>
                                        <TableCell>
                                            {project?.createdAtUtc
                                                ? new Date(Number(project?.createdAtUtc)).toLocaleDateString()
                                                : '—'}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(project?.createdAt).toLocaleString()}
                                        </TableCell>

                                        <TableCell>
                                            <Button
                                                onClick={() => handleRefreshProject(project.id)}
                                                sx={{fontSize: '0.7rem', mr: 2}}
                                                variant="contained"
                                                color="success">Refresh</Button>
                                            <Button
                                                onClick={() => handleDeleteProject(project.id)}
                                                sx={{fontSize: '0.7rem'}}
                                                variant="contained"
                                                color="error">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {projects.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Typography align="center">No projects found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Box sx={{width: '100%', minWidth: 1200}}>
                        <Skeleton animation="wave"/>
                        <Skeleton animation="wave"/>
                        <Skeleton animation="wave"/>
                    </Box>
            }
        </>
    );
}

export default ProjectsTable;
