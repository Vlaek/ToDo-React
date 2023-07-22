import React from 'react'

const Header = ({setActive}) => {
  return (
    <header className='header'>
        <h1 className="header__title">ToDo</h1>
        <button className="header__btn-add" onClick={setActive}>Добавить</button>
    </header>
  )
}

export default Header