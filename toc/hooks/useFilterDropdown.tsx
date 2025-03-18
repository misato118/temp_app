import { useState, useEffect } from "react";

const priceArray = ["Daily", "Monthly", "Yearly"];
const durationArray = ["Days", "Months", "Years"];

const useFilterDropdown = (dataType: string, register: any, setValue: any, watch: any) => {
    const array = dataType == "Price" ? priceArray : durationArray;
    const type = dataType == "Price" ? "priceType" : "durationType";
    const typeValue = watch(type, array[0]);

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(dataType + "Type");

    useEffect(() => {
        setValue(type, typeValue);
    }, [typeValue, setValue, type]);

    return {
        title,
        isOpen,
        array,
        type,
        setIsOpen,
        setTitle
    }
}

export default useFilterDropdown;