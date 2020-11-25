import React from 'react';
import Error404 from './Error404';

import { Switch, BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoutes from '../components/ProtectedRoutes';
import Dashboard from './Dashboard';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={LandingPage} />
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/signup" component={Signup} />
                <ProtectedRoutes
                    exact
                    path="/dashboard"
                    component={Dashboard}
                />
                <ProtectedRoutes exact path="/deposit" component={Deposit} />
                <ProtectedRoutes
                    exact
                    path="/withdraw/:_id"
                    component={Withdraw}
                />
                <Route exact component={Error404} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
