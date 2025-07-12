import {useState} from 'react';
import {Box, TextField, Button, Paper, Alert} from '@mui/material';

const ProjectCreate = ({onCreate, createError}) => {
    const [repoName, setRepoName] = useState('');

    const handleCreate = () => {
        if (repoName.trim() !== '') {
            onCreate(repoName.trim());
            setRepoName('');
        }
    };

    return (
        <Paper elevation={3}
               sx={{
                   maxWidth: 650,
                   mx: 'auto',
                   mt: 10,
                   display: 'flex',
                   gap: 2,
                   alignItems: 'flex-start',
                   p: 3,
               }}
        >
            <Box sx={{width: '100%'}}>
                <TextField
                    label="Repository Name"
                    variant="outlined"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    fullWidth
                    helperText="Example: facebook/react — only lowercase letters, numbers, dashes"
                />

                {createError &&
                <Alert variant="filled" severity="error" sx={{width: '100%', mt: 2}}>{createError}</Alert>}
            </Box>


            <Button sx={{mt: 0, mb: 'auto', px: '1.8rem', py: '1rem'}} variant="contained" onClick={handleCreate}
                    disabled={!repoName.trim()}>
                Create
            </Button>
        </Paper>
    );
}

export default ProjectCreate;
