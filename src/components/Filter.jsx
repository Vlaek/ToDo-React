import React from 'react'
import Input from './UI/Input'
import Select from './UI/Select'

const Filter = ({setFilter, setSort}) => {
    return (
        <div className='header__filter'>
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
        </div>
    )
}

export default Filter