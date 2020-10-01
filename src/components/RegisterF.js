import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Register.css';

const RegisterF = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли должны совпадать');
      return;
    }

    duckAuth.register(username, password, email).then((res) => {
      if (res.statusCode !== 400) {
        setMessage('');
        history.push('/login');
      } else {
        setMessage('Что-то пошло не так!' || res.message[0].messages[0].message);
      }
    });
  };

  return (
    <div className='register'>
      <Logo title={'CryptoDucks'} />
      <p className='register__welcome'>Пожалуйста, зарегистрируйтесь.</p>
      <p className='register__error'>{message}</p>
      <form onSubmit={handleSubmit} className='register__form'>
        <label htmlFor='username'>Логин:</label>
        <input
          id='username'
          name='username'
          type='text'
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor='password'>Пароль:</label>
        <input
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <label htmlFor='confirmPassword'>Подтвердите пароль:</label>
        <input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(evt) => setConfirmPassword(evt.target.value)}
        />
        <div className='register__button-container'>
          <button type='submit' className='register__link'>
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className='register__signin'>
        <p>Уже зарегистрированы?</p>
        <Link to='login' className='register__login-link'>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default RegisterF;
