import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import LoginF from './LoginF.js';
import RegisterF from './RegisterF.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const history = useHistory();

  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      duckAuth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({
            username: res.username,
            email: res.email,
          });

          history.push('/ducks');
        }
      });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogin = (res) => {
    setLoggedIn(true);
    setUserData({
        username: res.username,
        email: res.email,
      })
  };

const onAuth = (username, password) => {
    return duckAuth
      .authorize(username, password)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }

        if (data.jwt && data.user) {

            setLoggedIn(true);
            setUserData({
                username: data.user.username,
                email: data.user.email,
              })
        }
      });
}

  return (
    <Switch>
      <ProtectedRoute path='/ducks' loggedIn={loggedIn} component={Ducks} />
      <ProtectedRoute
        path='/my-profile'
        loggedIn={loggedIn}
        userData={userData}
        component={MyProfile}
      />
      <Route path='/login'>
        <div className='loginContainer'>
          <LoginF onAuth={onAuth} tokenCheck={tokenCheck} />
        </div>
      </Route>
      <Route path='/register'>
        <div className='registerContainer'>
          <RegisterF />
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to='/ducks' /> : <Redirect to='/login' />}
      </Route>
    </Switch>
  );
};

export default App;
