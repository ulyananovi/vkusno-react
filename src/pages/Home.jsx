import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <div className="home-page">
      <Helmet>
        <title>Вкусно — доставка еды на дом</title>
        <meta name="description" content="Вкусно — доставка еды на дом за 30 минут. Свежие блюда из локальных продуктов." />
      </Helmet>

      <header className="hero">
        <div className="hero-top">
          <div className="logo">
            <img src="/assets/img/шапка повара.png" className="logo-img" alt="Логотип сервиса Вкусно" />
            <span className="logo-text">Вкусно</span>
          </div>
          <nav className="top-nav" aria-label="Основная навигация">
            <Link to="/catalog" className="nav-btn">Каталог</Link>
            <Link to="/login" className="nav-btn nav-btn-outline">Войти</Link>
          </nav>
        </div>

        <div className="hero-content">
          <h1>Вкусная еда<br />с доставкой на дом</h1>
          <p>Готовим из свежих продуктов и привозим за 30 минут. Выбирайте из сотен блюд на любой вкус.</p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn-primary">Смотреть меню</Link>
            <Link to="/register" className="btn-secondary">Зарегистрироваться</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="features" aria-labelledby="features-title">
          <h2 className="section-title" id="features-title">Почему выбирают нас</h2>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true"></div>
              <h3>Быстрая доставка</h3>
              <p>Курьер приезжает за 30 минут или доставка бесплатна.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true"></div>
              <h3>Свежие продукты</h3>
              <p>Готовим каждый день из продуктов местных фермеров.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true"></div>
              <h3>Опытные повара</h3>
              <p>Наши шеф-повара готовят блюда разных кухонь мира.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon" aria-hidden="true"></div>
              <h3>Удобная оплата</h3>
              <p>Платите картой онлайн или наличными курьеру.</p>
            </article>
          </div>
        </section>

        <section className="categories" aria-labelledby="categories-title">
          <h2 className="section-title" id="categories-title">Что заказать сегодня</h2>
          <div className="category-grid">
            <Link to="/catalog" className="category-card">
              <img src="/assets/img/суп.png" alt="Супы" width="50" height="50" />
              <span>Супы</span>
            </Link>
            <Link to="/catalog" className="category-card">
              <img src="/assets/img/салат.png" alt="Салаты" width="50" height="50" />
              <span>Салаты</span>
            </Link>
            <Link to="/catalog" className="category-card">
              <img src="/assets/img/паста.png" alt="Паста" width="50" height="50" />
              <span>Паста</span>
            </Link>
            <Link to="/catalog" className="category-card">
              <img src="/assets/img/сэндвич.png" alt="Сэндвичи" width="50" height="50" />
              <span>Сэндвичи</span>
            </Link>
            <Link to="/catalog" className="category-card">
              <img src="/assets/img/десерт.png" alt="Десерты" width="50" height="50" />
              <span>Десерты</span>
            </Link>
            <Link to="/catalog" className="category-card">
              <img src="/assets/img/напитки.png" alt="Напитки" width="50" height="50" />
              <span>Напитки</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;