import React, { FC, ForwardedRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    setFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ setFilter }, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <div className="header__search">
                <input className="header__input" ref={ref} onChange={setFilter} />
                <IoCloseSharp
                    className="header__btn-close"
                    onClick={(e: any) => {
                        const input = document.querySelector(".header__input") as HTMLInputElement;
                        if (input) {
                            input.value = "";
                            setFilter(e);
                        }
                    }}
                />
            </div>
        );
    }
);

export default Input;
