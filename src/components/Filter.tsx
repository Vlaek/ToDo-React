import { FC, useState } from "react";
import Input from "./UI/Input";
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

    const handleChange = (option: Option | null) => {
        setSelectedOption(option);
        if (option) {
            setSort(option);
        }
    };

    const colorStyles = {
        control: (styles: any, state: any) => ({
            ...styles,
            backgroundColor: "white",
            height: "100%",
            border: state.isFocused ? 0 : 0,
            boxShadow: state.isFocused ? 0 : 0,
            borderRadius: 0,
        }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => ({
            ...styles,
            backgroundColor: isFocused && "#e0e0e0",
            color: "black",
            display: isSelected && "none",
            fontSize: "16px",
        }),
        menu: (styles: any) => ({
            ...styles,
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        }),
        menuList: (styles: any) => ({
            ...styles,
            padding: 0,
        }),
    };

    return (
        <>
            <Input setFilter={setFilter} />
            <Select
                defaultValue={selectedOption}
                options={options}
                onChange={handleChange}
                styles={colorStyles}
                isSearchable={false}
                className="header__select"
                classNamePrefix="header__select"
            />
        </>
    );
};

export default Filter;
