import * as React from 'react';
import {useState} from 'react';
import {Container, TextField, Button, Typography, Box, Paper, Tabs, Tab, CircularProgress} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const registerSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const Authentication = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const isLogin = tabIndex === 0;

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isLogin) {
                console.log('Logging in with', data);
                // await api.login(data);
                localStorage.setItem('token', 'mock-token');
            } else {
                console.log('Registering with', data);
                // await api.register(data);
                localStorage.setItem('token', 'mock-token');
            }
        } catch (err) {
            console.error(err);
            // handle API errors
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{p: 4, mt: 8}}>
                <Typography variant="h4" align="center" gutterBottom>
                    {isLogin ? 'Login' : 'Register'}
                </Typography>

                <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} centered>
                    <Tab label="Login"/>
                    <Tab label="Register"/>
                </Tabs>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{mt: 3}}
                    noValidate
                >
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{mt: 2}}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit"/> : isLogin ? 'Login' : 'Register'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Authentication;

