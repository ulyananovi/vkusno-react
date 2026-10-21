import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const recipesData = [
  { id: 1, type: 'паста', filters: ['с мясом', 'с сыром'], title: 'Паста Карбонара', price: '450 ₽', weight: '320 г', img: '/assets/img/паста карбонара.jpg' },
  { id: 2, type: 'салат', filters: ['популярные', 'с овощами', 'с сыром'], title: 'Греческий салат', price: '320 ₽', weight: '250 г', img: '/assets/img/греч.jpg' },
  { id: 3, type: 'суп', filters: ['популярные', 'с морепродуктами', 'с грибами'], title: 'Том Ям с креветками', price: '590 ₽', weight: '400 г', img: '/assets/img/том.jpg' },
  { id: 4, type: 'десерт', filters: ['популярные', 'десерты', 'с сыром'], title: 'Тирамису', price: '280 ₽', weight: '150 г', img: '/assets/img/тирамису.jpg' },
  { id: 5, type: 'напитки', filters: ['популярные', 'с овощами'], title: 'Мохито безалкогольный', price: '190 ₽', weight: '400 мл', img: '/assets/img/мохито.jpg' },
  { id: 6, type: 'сэндвич', filters: ['популярные', 'с мясом', 'с овощами'], title: 'Клубный с курицей', price: '390 ₽', weight: '280 г', img: '/assets/img/сендвич.jpg' },
  { id: 7, type: 'суп', filters: ['с овощами', 'с сыром'], title: 'Крем-суп из тыквы', price: '340 ₽', weight: '300 г', img: '/assets/img/крем.jpg' },
  { id: 8, type: 'салат', filters: ['популярные', 'с мясом', 'с овощами'], title: 'Цезарь с курицей', price: '410 ₽', weight: '270 г', img: '/assets/img/цезарь.jpg' },
];

const categories = [
  { type: 'суп', name: 'Супы', img: '/assets/img/суп.png' },
  { type: 'салат', name: 'Салаты', img: '/assets/img/салат.png' },
  { type: 'паста', name: 'Паста', img: '/assets/img/паста.png' },
  { type: 'сэндвич', name: 'Сэндвичи', img: '/assets/img/сэндвич.png' },
  { type: 'десерт', name: 'Десерты', img: '/assets/img/десерт.png' },
  { type: 'напитки', name: 'Напитки', img: '/assets/img/напитки.png' },
];

const allFilters = ['популярные', 'с овощами', 'с мясом', 'с грибами', 'с морепродуктами', 'с сыром', 'десерты'];

function Catalog() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  const handleTypeClick = (type) => {
    if (activeType === type) {
      setActiveType(null);
      setActiveFilter(null);
    } else {
      setActiveType(type);
      setActiveFilter(null);
    }
  };

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const availableFilters = activeType
    ? new Set(recipesData.filter(r => r.type === activeType).flatMap(r => r.filters))
    : null;

  const visibleRecipes = recipesData.filter(recipe => {
    if (activeType && recipe.type !== activeType) return false;
    if (activeFilter && !recipe.filters.includes(activeFilter)) return false;
    if (search && !recipe.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const sortedRecipes = [...visibleRecipes].sort((a, b) => {
    const q = search.trim().toLowerCase();
    if (!q) return 0;
    const sa = a.title.toLowerCase().startsWith(q);
    const sb = b.title.toLowerCase().startsWith(q);
    if (sa && !sb) return -1;
    if (!sa && sb) return 1;
    return a.title.localeCompare(b.title);
  });

  return (
    <>
      <Helmet>
        <title>Каталог блюд — Вкусно</title>
        <meta name="description" content="Каталог блюд сервиса Вкусно: супы, салаты, паста, сэндвичи, десерты и напитки." />
      </Helmet>

      <header className="catalog-header">
        <Link to="/" className="back-link">← На главную</Link>
        <h1 className="page-title">Каталог блюд</h1>
      </header>

      <main>
        <div className="toolbar">
          <p className="section-title">Типы блюда</p>
          <div className="search-filter">
            <div className="search">
              <input
                className="input"
                type="search"
                placeholder="Поиск блюд"
                aria-label="Поиск блюд"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img src="/assets/img/поиск.png" className="search-img" alt="" aria-hidden="true" width="15" height="15" />
            </div>
          </div>
        </div>

        <div className="ingredients">
          <div className="cards-ingredients-swipe" role="tablist" aria-label="Категории блюд">
            {categories.map(cat => (
              <button
                key={cat.type}
                className={`ingredient-card ${activeType === cat.type ? 'active-type-shrink' : ''}`}
                type="button"
                role="tab"
                aria-selected={activeType === cat.type}
                onClick={() => handleTypeClick(cat.type)}
              >
                <div className="ingredient-image">
                  <img src={cat.img} alt={cat.name} width="60" height="60" loading="lazy" />
                </div>
                <div className="ingredient-name">{cat.name}</div>
              </button>
            ))}
          </div>

          <div className="main-swipe" role="group" aria-label="Фильтры по ингредиентам">
            {allFilters.map(filter => {
              const isDisabled = availableFilters ? !availableFilters.has(filter) : false;
              return (
                <p
                  key={filter}
                  role="button"
                  tabIndex={0}
                  className={`${activeFilter === filter ? 'active-filter' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => !isDisabled && handleFilterClick(filter)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                      e.preventDefault();
                      handleFilterClick(filter);
                    }
                  }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </p>
              );
            })}
          </div>

          <div className="recipes-container">
            <div className="cards-main" id="cardsMain">
              {sortedRecipes.map(recipe => (
                <article className="recipe-card" key={recipe.id}>
                  <div className="dish-image">
                    <img src={recipe.img} alt={recipe.title} width="320" height="180" loading="lazy" style={{ objectFit: 'cover' }} />
                  </div>
                  <h3 className="dish-title">{recipe.title}</h3>
                  <div className="cooking-info">
                    <span className="price">{recipe.price}</span>
                    <span className="weight">{recipe.weight}</span>
                  </div>
                </article>
              ))}
            </div>
            {visibleRecipes.length === 0 && (
              <p className="empty-message">Ничего не найдено. Попробуйте изменить фильтры.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Catalog;