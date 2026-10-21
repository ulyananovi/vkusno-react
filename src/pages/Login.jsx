import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Введите почту';
    else if (!EMAIL_RE.test(email.trim())) newErrors.email = 'Некорректный формат почты';
    if (!password) newErrors.password = 'Введите пароль';
    else if (password.length < 6) newErrors.password = 'Пароль слишком короткий';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const login = email.split('@')[0];
    localStorage.setItem('vkusno_auth', 'true');
    localStorage.setItem('vkusno_user', login);
    localStorage.setItem('vkusno_login', login);
    navigate('/profile');
  };

  return (
    <main className="auth-page">
      <Helmet>
        <title>Вход в аккаунт — Вкусно</title>
        <meta name="description" content="Вход в аккаунт сервиса доставки еды Вкусно." />
      </Helmet>

      <div className="main">
        <div className="create-acc">
          <img src="/assets/img/шапка повара.png" className="chef-hat" alt="Логотип Вкусно" width="54" height="54" />
          <p>Вход в<br />аккаунт</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="text" htmlFor="loginEmail">Почта</label>
            <input
              className={`form-style ${errors.email ? 'input-error' : ''}`}
              id="loginEmail"
              type="email"
              placeholder="Введите почту"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="error-msg" role="alert">{errors.email}</span>
          </div>

          <div className="input-group">
            <label className="text" htmlFor="loginPassword">Пароль</label>
            <div className="password-wrap">
              <input
                className={`form-style ${errors.password ? 'input-error' : ''}`}
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                <img
                  src={showPassword ? '/assets/img/закрыт глаз.svg' : '/assets/img/открыт глаз.svg'}
                  alt=""
                  className="eye-icon"
                  width="18" height="18"
                />
              </button>
            </div>
            <span className="error-msg" role="alert">{errors.password}</span>
          </div>

          <button type="submit" className="button">ВОЙТИ</button>
          <Link to="/register" className="link-secondary">Нет аккаунта?</Link>
          <Link to="/" className="link-secondary">← На главную</Link>
        </form>
      </div>
    </main>
  );
}

export default Login;