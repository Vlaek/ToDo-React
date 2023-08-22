import React, { FC, useState } from "react";
import Input from "./UI/Input";
// import Select from './UI/Select'
import Select from "react-select";
import { SetFilterFunc, SetSortFunc } from "../types/types";

interface Option {
    value: string;
    label: string;
}

interface FilterProps {
    setFilter: SetFilterFunc;
    setSort: SetSortFunc;
}

const Filter: FC<FilterProps> = ({ setFilter, setSort }) => {
    const options: Option[] = [
        { value: "title", label: "По названию" },
        { value: "text", label: "По описанию" },
        { value: " ", label: "Без сортировки" },
    ];

    const [selectedOption, setSelectedOption] = useState<Option | null>({
        value: "",
        label: "Без сортировки",
    });

    const onChange = (option: Option | null) => {
        setSelectedOption(option);
        if (option) {
            setSort(option);
        }
    };

    return (
        <div className="header__filter">
            <Input setFilter={setFilter} />
            <Select
                defaultValue={selectedOption}
                options={options}
                onChange={onChange}
                className="header__select"
                classNamePrefix="header__select"
            />
        </div>
    );
};

export default Filter;
