import React, { useEffect } from 'react';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import * as Yup from 'yup';
import SubmitButton from '../components/Forms/SubmitButton';
import { useApi } from '../hooks/useApi';
import { register } from '../api/auth';
import { getRoles } from '../api/roles';
import { Link } from 'react-router-dom';

const signupSchema = Yup.object({
    email: Yup.string().email().required().label('Email Address'),
    username: Yup.string().required().label('Username'),
    provider: Yup.string().required().label('Provider'),

    password: Yup.string().required().label('Password'),
});

function Signup() {
    const { loading, request, error, data } = useApi(register);
    const getRolesApi = useApi(getRoles);

    const handleSubmit = (values) => {
        const role = getRolesApi.data?.roles.find((r) => r.name === 'client');

        const payload = { ...values, role };
        console.log(payload);
        debugger;
        request(values);
    };

    useEffect(() => {
        getRolesApi.request();
    }, []);

    // console.log(getRolesApi.data?.roles.find((r) => r.name === 'client'));
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
                            | Sign up
                        </h3>
                    </div>
                    <div className="card-body">
                        {error && <p className="text-danger">{error}</p>}
                        {data && (
                            <p className="text-success">
                                Account created successfully{' '}
                                <Link to="/login">Login now</Link>
                            </p>
                        )}
                        <Form
                            initialValues={{
                                username: '',
                                email: '',
                                password: '',

                                provider: 'local',
                            }}
                            handleSubmit={handleSubmit}
                            validationSchema={signupSchema}
                        >
                            <FormField
                                name="username"
                                placeholder="Your username"
                                label="Username"
                            />
                            <FormField
                                name="email"
                                placeholder="Your email address"
                                type="email"
                                label="Email"
                            />
                            <FormField
                                name="password"
                                placeholder="Your password"
                                label="Password"
                                type="password"
                            />
                            <SubmitButton title="Sign up" loading={loading} />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
