import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/img/шапка повара.png" className="footer-logo-img" alt="" />
            <span className="footer-logo-text">Вкусно</span>
          </div>
          <p className="footer-desc">
            Доставка свежей еды на дом за 30 минут.
            Готовим из локальных продуктов каждый день.
          </p>
        </div>

        <nav className="footer-col" aria-label="Навигация в футере">
          <h2 className="footer-title">Навигация</h2>
          <Link to="/" className="footer-link">Главная</Link>
          <Link to="/catalog" className="footer-link">Каталог</Link>
          <Link to="/profile" className="footer-link">Профиль</Link>
        </nav>

        <div className="footer-col">
          <h2 className="footer-title">Аккаунт</h2>
          <div id="footerAccount" className="footer-account">
            <Link to="/login" className="footer-link">Войти</Link>
            <Link to="/register" className="footer-link">Регистрация</Link>
          </div>
        </div>

        <div className="footer-col">
          <h2 className="footer-title">Контакты</h2>
          <a className="footer-link">+7 (800) 123-45-67</a>
          <a className="footer-link">vkusno2026@yandex.ru</a>
          <span className="footer-text">Ежедневно 10:00 – 23:00</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Вкусно. Все права защищены.</span>
        <span>Доставка еды · Ульяновск</span>
      </div>
    </footer>
  );
}

export default Footer;