import React from 'react'
import Input from './UI/Input'
import Select from './UI/Select'

const Header = ({setActive, setFilter, setSort}) => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header>
            <div className="header">
                <h1 className="header__title" onClick={scrollToTop} translate='no'>
                    T<span className='header__letter'>o</span>D<span className='header__letter'>o</span>
                </h1>
                <Input 
                    onChange={setFilter}
                    placeholder="Поиск по названию..."
                />
                <Select
                    defaultValue="Без сортировки"
                    onChange={setSort}
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'text', name: 'По описанию'},
                    ]}
                />
                <button className="header__btn-add" onClick={setActive}>Добавить</button>
            </div>
        </header>
    )
}

export default Header