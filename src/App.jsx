import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  
  // Проверяем, находимся ли мы на странице входа или регистрации
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    // Если это страница входа, вешаем класс auth-page на весь контейнер
    <div className={isAuthPage ? 'auth-page' : ''}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      {/* Футер не показываем на страницах входа */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;