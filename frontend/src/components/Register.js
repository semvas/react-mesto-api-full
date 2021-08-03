import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onRegister(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          className="auth__input"
          placeholder="Email"
          minLength="6" maxLength="30"
          onChange={handleEmailChange}
          value={email || ''}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          className="auth__input"
          placeholder="Пароль"
          minLength="6" maxLength="30"
          onChange={handlePasswordChange}
          value={password || ''}
          required
        />
        <button type="submit" className="auth__save-btn btn">Зарегистрироваться</button>
        <p className="auth__text">Уже зарегистрированы? <Link className="auth__link link" to="/sign-in">Войти</Link></p>
      </form>
    </div>
  )
}

export default Register;