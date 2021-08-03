import { useState } from 'react';

function Login(props) {
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

    props.onLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
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
        <button type="submit" className="auth__save-btn btn">Войти</button>
      </form>
    </div>
  )
}

export default Login;