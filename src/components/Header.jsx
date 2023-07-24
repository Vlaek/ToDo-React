import React from 'react'
import Filter from './Filter'

const Header = ({setActive, setFilter, setSort}) => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className='header'>
            <h1 className="header__title" onClick={scrollToTop}>
                T<span className='header__letter'>o</span>D<span className='header__letter'>o</span>
            </h1>
            <Filter
                setFilter={setFilter} 
                setSort={setSort}
            />
            <button className="header__btn-add" onClick={setActive}>Добавить</button>
        </header>
    )
}

export default Header