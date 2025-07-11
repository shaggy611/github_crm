import {useState} from 'react';
import Authentication from "../components/Authentication";
import {useRegisterAccount} from "../hooks/useRegisterAccount";
import {RegisterAccountDto} from "../api/types/auth.types";
import {useLoginAccount} from "../hooks/useLoginAccount";
import {useUser} from "../store/UserContext";

const AuthenticationPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [isRegisterSuccess, setRegisterSuccess] = useState(false)
    const isLogin = tabIndex === 0;
    const {handleRegister, loading: registrationLoading, error: registrationError} = useRegisterAccount();
    const {handleLogin, loading: loginLoading, error: loginError} = useLoginAccount();
    const { setUser } = useUser();

    const handleTabIndex = (val) => setTabIndex(val);

    const onSubmit = async (formData: RegisterAccountDto, reset: () => void) => {
        try {
            if (isLogin) {
                const loginResponse = await handleLogin(formData);

                localStorage.setItem('token', loginResponse?.access_token);

                setUser({email: loginResponse.email})
            } else {
                await handleRegister(formData);

                setRegisterSuccess(true);

                reset();

                setTimeout(() => {
                    setRegisterSuccess(false);
                    setTabIndex(0)
                }, 3000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return <Authentication
        onFormSubmit={onSubmit}
        handleTabIndex={handleTabIndex}
        isLogin={isLogin}
        isRegisterSuccess={isRegisterSuccess}
        loading={registrationLoading}
        registrationError={registrationError}
        loginError={loginError}
        tabIndex={tabIndex} />;
};

export default AuthenticationPage;

