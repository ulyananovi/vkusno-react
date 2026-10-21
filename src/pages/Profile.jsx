import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Имя Фамилия', nick: '@никнейм' });

  useEffect(() => {
    const fullName = localStorage.getItem('vkusno_user');
    const login = localStorage.getItem('vkusno_login');
    const auth = localStorage.getItem('vkusno_auth');
    if (auth !== 'true') { navigate('/login'); return; }
    if (fullName) setUser(prev => ({ ...prev, name: fullName }));
    if (login) setUser(prev => ({ ...prev, nick: '@' + login }));
  }, [navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
      localStorage.removeItem('vkusno_auth');
      localStorage.removeItem('vkusno_user');
      localStorage.removeItem('vkusno_login');
      navigate('/');
    }
  };

  const handleUnavailable = () => {
    alert('Эта функция временно недоступна');
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Профиль — Вкусно</title>
        <meta name="description" content="Профиль пользователя сервиса доставки еды Вкусно." />
      </Helmet>

      <header>
        <button type="button" className="setup-btn" onClick={() => setIsModalOpen(true)} aria-label="Настройки профиля">
          <img src="/assets/img/настройки.png" className="setup" alt="" width="40" height="40" />
        </button>
      </header>

      {isModalOpen && (
        <div className="settings-modal" style={{ display: 'flex' }} onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Настройки</h3>
            <div className="menu-item" tabIndex="0" role="button" onClick={handleUnavailable}><span>Редактировать имя и фамилию</span></div>
            <div className="menu-item" tabIndex="0" role="button" onClick={handleUnavailable}><span>Редактировать никнейм</span></div>
            <div className="menu-item" tabIndex="0" role="button" onClick={handleUnavailable}><span>Поменять фото профиля</span></div>
            <div className="menu-item" tabIndex="0" role="button" onClick={handleUnavailable}><span>Изменить адрес доставки</span></div>
            <div className="menu-item" tabIndex="0" role="button" onClick={handleUnavailable}><span>Переключить тему</span></div>
            <div className="menu-item logout"><a href="#" onClick={handleLogout}>Выйти из аккаунта</a></div>
            <div className="menu-item cancel" onClick={() => setIsModalOpen(false)}><span role="button" tabIndex="0">Отмена</span></div>
          </div>
        </div>
      )}

      <main>
        <div className="main">
          <section className="profile" aria-label="Профиль пользователя">
            <img src="/assets/img/фото профиля.jpg" className="img-pfp" alt="Фото профиля" width="120" height="120" />
            <div className="profile-text">
              <p className="profile-name">{user.name}</p>
              <p className="profile-nick">{user.nick}</p>
            </div>
          </section>

          <section className="stats" aria-label="Статистика">
            <div className="stats-item"><p className="stats-value">2</p><p className="stats-label">Заказа</p></div>
            <div className="stats-item"><p className="stats-value">5</p><p className="stats-label">Бонусов</p></div>
            <div className="stats-item"><p className="stats-value">25</p><p className="stats-label">Избранных</p></div>
          </section>

          <section className="section" aria-labelledby="ordersTitle">
            <div className="section-head">
              <h2 className="section-title" id="ordersTitle">Мои заказы</h2>
              <img src="/assets/img/плюс.png" className="add-img" alt="Добавить" width="24" height="24" />
            </div>
            <div className="cards-list">
              <article className="dish-card">
                <div className="dish-image"><img src="/assets/img/запеканка.png" alt="Запеканка" loading="lazy" width="320" height="170" style={{ objectFit: 'cover' }} /></div>
                <h3 className="dish-title">Картофельная запеканка с фаршем</h3>
                <div className="dish-info"><span className="price">390 ₽</span><span className="status">Доставлен</span></div>
              </article>
            </div>
          </section>

          <section className="section" aria-labelledby="favoritesTitle">
            <div className="section-head">
              <h2 className="section-title" id="favoritesTitle">Избранные блюда</h2>
            </div>
            <div className="cards-list">
              <article className="dish-card">
                <div className="dish-image"><img src="/assets/img/паста карбонара.jpg" alt="Паста Карбонара" loading="lazy" width="320" height="170" style={{ objectFit: 'cover' }} /></div>
                <h3 className="dish-title">Паста Карбонара</h3>
                <div className="dish-info"><span className="price">450 ₽</span><span className="status">В меню</span></div>
              </article>
            </div>
          </section>

          <div className="profile-links">
            <Link to="/catalog" className="link">← В каталог</Link>
            <Link to="/" className="link">На главную</Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;