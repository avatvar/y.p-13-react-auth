import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Login.css';

const LoginF = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setMessage('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!username || !password) {
      return;
    }

    onAuth(username, password)
      .then(() => resetForm())
      .then(() => history.push('/ducks'))
      .catch((err) => setMessage(err || 'Что-то пошло не так!'));
  };

  return (
    <div onSubmit={handleSubmit} className='login'>
      <Logo title={'CryptoDucks'} />
      <p className='login__welcome'>
        Это приложение содержит конфиденциальную информацию. Пожалуйста, войдите
        или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
      </p>
      <p className='login__error'>{message}</p>
      <form className='login__form'>
        <label htmlFor='username'>Логин:</label>
        <input
          id='username'
          required
          name='username'
          type='text'
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <label htmlFor='password'>Пароль:</label>
        <input
          id='password'
          required
          name='password'
          type='password'
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <div className='login__button-container'>
          <button type='submit' className='login__link'>
            Войти
          </button>
        </div>
      </form>

      <div className='login__signup'>
        <p>Ещё не зарегистрированы?</p>
        <Link to='/register' className='signup__link'>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default LoginF;
