import React from 'react'
import Choices from 'choices.js'

const Select = ({options, defaultValue, onChange}) => {
    React.useEffect(() => {
        if (!document.querySelector('.js-choice').classList.contains('choices__input')) {
            new Choices('.js-choice', {
                searchEnabled: false,
                allowHTML: true,
                itemSelectText: ""
            });
        }
    }, []);

    return (
        <div className="header__select">
            <select
                onChange={onChange}
                className='js-choice'
            >
                <option className='header__option' value=" " >{defaultValue}</option>
                {options.map(option => 
                    <option className='header__option' key={option.value} value={option.value}>
                        {option.name}
                    </option>    
                )}
            </select>
        </div>
    )
}

export default Select