import React from 'react';
import Router from './Pages/Router';
import AuthContext from './components/AuthContext';

function App() {
    return (
        <AuthContext>
            <Router />
        </AuthContext>
    );
}

export default App;
