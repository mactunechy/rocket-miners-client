import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(authContext);
    if (user === null) return null;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
