import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthStore from '../api/authStore';

function AuthenticatedNavbar() {
    const history = useHistory();
    const logOut = async () => {
        const yes = window.confirm('Are you sure you want to logout?');
        if (!yes) return;
        await AuthStore.removeToken();
        history.push('/');
    };
    return (
        <nav
            className="navbar navbar-light navbar-color-on-scroll fixed-top navbar-expand-lg"
            color-on-scroll="100"
            id="sectionsNav"
        >
            <div className="container">
                <div className="navbar-translate">
                    <a
                        style={{ fontWeight: 'bold', fontSize: '30px' }}
                        className="navbar-brand"
                        href="/"
                    >
                        Rocket - <span className="text-danger">Miners</span>
                    </a>
                </div>
                <ul className="navbar-nav d-inline-flex ml-auto">
                    <li className="nav-item">
                        <Link className="text-danger" to="/dashboard">
                            <i className="fa fa-dashboard"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button
                            className="text-danger btn btn-link"
                            onClick={logOut}
                        >
                            <i className="fa fa-sign-out"></i> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default AuthenticatedNavbar;
