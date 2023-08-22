import React, { FC } from "react";
// import Input from './UI/Input'
// import Select from './UI/Select'
import { ISetModalActive, SetFilterFunc, SetSortFunc } from "../types/types";
import Filter from "./Filter";

interface HeaderProps {
    setModalActive: ISetModalActive;
    setFilter: SetFilterFunc;
    setSort: SetSortFunc;
}

const Header: FC<HeaderProps> = ({ setModalActive, setFilter, setSort }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header>
            <div className="header">
                <h1 className="header__title" onClick={scrollToTop} translate="no">
                    T<span className="header__letter">o</span>D
                    <span className="header__letter">o</span>
                </h1>
                <Filter setFilter={setFilter} setSort={setSort} />
                <button className="header__btn-add" onClick={() => setModalActive(null)}>
                    Добавить
                </button>
            </div>
        </header>
    );
};

export default Header;
