import {Alert, Box, Button, CircularProgress, Container, Paper, Tab, Tabs, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const registerSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Min 6 characters').required('Password is required'),
});

const Authentication = (props) => {
    const {
        onFormSubmit,
        loading,
        handleTabIndex,
        isLogin,
        tabIndex,
        registrationError,
        loginError,
        isRegisterSuccess
    } = props;

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        resolver: yupResolver(isLogin ? loginSchema : registerSchema),
    });

    return <>
        <Container maxWidth="sm" sx={{width: '100%'}}>
            {
                !isRegisterSuccess
                    ? <Paper elevation={3} sx={{p: 4, mt: 8}}>
                        {registrationError || loginError
                            ? <Alert variant="outlined" severity="warning"
                                     sx={{width: '100%', my: 2}}>{registrationError || loginError}</Alert>
                            : <Typography variant="h5" align="center" gutterBottom style={{marginBottom: '3rem'}}>
                                {isLogin ? 'Login to dashboard' : 'Create new account'}
                            </Typography>
                        }

                        <Tabs value={tabIndex} onChange={(e, val) => handleTabIndex(val)} centered>
                            <Tab label="Login"/>
                            <Tab label="Register"/>
                        </Tabs>

                        <Box
                            component="form"
                            onSubmit={handleSubmit((data) => onFormSubmit(data, reset))}
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
                    : <><p>Registered</p></>
            }
        </Container>
    </>
}

export default Authentication;
