import React from 'react'
import Filter from './Filter'

const Header = ({setActive, filter, setFilter, setSort}) => {
    return (
        <header className='header'>
            <h1 className="header__title">ToDo</h1>
            <Filter 
                filter={filter} 
                setFilter={setFilter} 
                setSort={setSort}
            />
            <button className="header__btn-add" onClick={setActive}>Добавить</button>
        </header>
    )
}

export default Header