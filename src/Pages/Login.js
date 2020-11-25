import React, { useContext } from 'react';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import * as Yup from 'yup';
import SubmitButton from '../components/Forms/SubmitButton';
import { useApi } from '../hooks/useApi';
import { login } from '../api/auth';
import { Link, useHistory } from 'react-router-dom';
import { authContext } from '../components/AuthContext';

const loginSchema = Yup.object({
    email: Yup.string().email().required().label('Email Address'),
    password: Yup.string().required().label('Password'),
});

function Login() {
    const { loading, error, request } = useApi(login);
    const history = useHistory();

    const { setUser } = useContext(authContext);

    const handleSubmit = async (values) => {
        console.log('Values', values);
        const response = await request({
            password: values.password,
            identifier: values.email,
        });
        if (response.ok) {
            setUser(response.data.user);
            history.push('/dashboard');
        }
    };
    return (
        <div
            className="justify-content-center align-items-center row"
            style={{ minHeight: ' 100vh', width: '100%' }}
        >
            <div className="col-md-6 col-sm-10">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">
                            Rocket - <span className="text-danger">Miners</span>{' '}
                            | Login
                        </h3>
                    </div>
                    <div className="card-body">
                        {error && <p className="text-danger">{error}</p>}
                        <Form
                            initialValues={{ email: '', password: '' }}
                            handleSubmit={handleSubmit}
                            validationSchema={loginSchema}
                        >
                            <FormField
                                name="email"
                                placeholder="Your email address"
                                label="Email"
                            />
                            <FormField
                                name="password"
                                placeholder="Your password"
                                label="Password"
                                type="password"
                            />
                            <SubmitButton title="Login" loading={loading} />
                            <span className="ml-3">
                                {' '}
                                <Link to="/signup">Signup</Link> instead{' '}
                            </span>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
