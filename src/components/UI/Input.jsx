import React from 'react';
import { IoCloseSharp } from 'react-icons/io5'

const Input = React.forwardRef((props, ref) => {
    return (
        <div className='header__search'>
            <input className='header__input' ref={ref} {...props}/>
            <IoCloseSharp 
                className='header__btn-close' 
                onClick={(e) => {
                    document.querySelector('.header__input').value = "";
                    props.onChange(e)
                }}
            />
        </div>
        
    );
});

export default Input;