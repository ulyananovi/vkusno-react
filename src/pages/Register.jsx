import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', login: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const LOGIN_RE = /^[a-zA-Z0-9_]+$/;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Введите ФИО';
    else if (form.name.trim().split(/\s+/).length < 2) newErrors.name = 'Укажите имя и фамилию';
    if (!form.email.trim()) newErrors.email = 'Введите почту';
    else if (!EMAIL_RE.test(form.email.trim())) newErrors.email = 'Некорректный формат почты';
    if (!form.login.trim()) newErrors.login = 'Введите логин';
    else if (form.login.trim().length < 3) newErrors.login = 'Логин не короче 3 символов';
    else if (!LOGIN_RE.test(form.login.trim())) newErrors.login = 'Только латиница, цифры и _';
    if (!form.password) newErrors.password = 'Введите пароль';
    else if (form.password.length < 8) newErrors.password = 'Пароль не короче 8 символов';
    if (!form.confirm) newErrors.confirm = 'Повторите пароль';
    else if (form.confirm !== form.password) newErrors.confirm = 'Пароли не совпадают';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    localStorage.setItem('vkusno_auth', 'true');
    localStorage.setItem('vkusno_user', form.name.trim());
    localStorage.setItem('vkusno_login', form.login.trim());
    alert('Регистрация прошла успешно!');
    navigate('/profile');
  };

  return (
    <main className="auth-page">
      <Helmet>
        <title>Регистрация — Вкусно</title>
        <meta name="description" content="Регистрация в сервисе доставки еды Вкусно." />
      </Helmet>

      <div className="main">
        <div className="create-acc">
          <img src="/assets/img/шапка повара.png" className="chef-hat" alt="Логотип Вкусно" width="54" height="54" />
          <p>Создание<br />аккаунта</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="text" htmlFor="regName">ФИО</label>
            <input className={`form-style ${errors.name ? 'input-error' : ''}`} id="regName" name="name" type="text" placeholder="Иванов Иван Иванович" autoComplete="name" value={form.name} onChange={handleChange} />
            <span className="error-msg" role="alert">{errors.name}</span>
          </div>
          <div className="input-group">
            <label className="text" htmlFor="regEmail">Почта</label>
            <input className={`form-style ${errors.email ? 'input-error' : ''}`} id="regEmail" name="email" type="email" placeholder="example@mail.ru" autoComplete="email" value={form.email} onChange={handleChange} />
            <span className="error-msg" role="alert">{errors.email}</span>
          </div>
          <div className="input-group">
            <label className="text" htmlFor="regLogin">Логин</label>
            <input className={`form-style ${errors.login ? 'input-error' : ''}`} id="regLogin" name="login" type="text" placeholder="Ваш логин" autoComplete="username" value={form.login} onChange={handleChange} />
            <span className="error-msg" role="alert">{errors.login}</span>
          </div>
          <div className="input-group">
            <label className="text" htmlFor="regPassword">Пароль</label>
            <div className="password-wrap">
              <input className={`form-style ${errors.password ? 'input-error' : ''}`} id="regPassword" name="password" type={showPassword ? 'text' : 'password'} placeholder="Минимум 8 символов" autoComplete="new-password" value={form.password} onChange={handleChange} />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)} aria-label="Показать пароль">
                <img src={showPassword ? '/assets/img/закрыт глаз.svg' : '/assets/img/открыт глаз.svg'} alt="" className="eye-icon" width="18" height="18" />
              </button>
            </div>
            <span className="error-msg" role="alert">{errors.password}</span>
          </div>
          <div className="input-group">
            <label className="text" htmlFor="regPasswordConfirm">Повтор пароля</label>
            <div className="password-wrap">
              <input className={`form-style ${errors.confirm ? 'input-error' : ''}`} id="regPasswordConfirm" name="confirm" type={showConfirm ? 'text' : 'password'} placeholder="Повторите пароль" autoComplete="new-password" value={form.confirm} onChange={handleChange} />
              <button type="button" className="toggle-password" onClick={() => setShowConfirm(!showConfirm)} aria-label="Показать пароль">
                <img src={showConfirm ? '/assets/img/закрыт глаз.svg' : '/assets/img/открыт глаз.svg'} alt="" className="eye-icon" width="18" height="18" />
              </button>
            </div>
            <span className="error-msg" role="alert">{errors.confirm}</span>
          </div>
          <button type="submit" className="button">ЗАРЕГИСТРИРОВАТЬСЯ</button>
          <Link to="/login" className="link-secondary">Есть аккаунт?</Link>
          <Link to="/" className="link-secondary">← На главную</Link>
        </form>
      </div>
    </main>
  );
}

export default Register;