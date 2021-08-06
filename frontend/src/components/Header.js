import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img  className="header__logo" src={logo} alt="Логотип" />
      <div className="header__wrap">
        {props.loggedIn ? (
          <>
            <p className="header__email">{props.email}</p>
            <Link className="header__link header__link_logout" to="/signin" onClick={props.onSignOut}>Выйти</Link>
          </>
        ) : (
          <>
            {location.pathname === "/signin" ?
              <Link className="header__link link" to="/signup">Регистрация</Link> :
              <Link className="header__link link" to="/signin">Войти</Link>
            }
          </>
        )}
      </div>
    </header>
  );
}

export default Header