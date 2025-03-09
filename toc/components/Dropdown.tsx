import { useState, useEffect } from "react";

const priceArray = ["Daily", "Monthly", "Yearly"];
const durationArray = ["Days", "Months", "Years"];

// Dropdown for price/duration
const Dropdown = ({ dataType, register, setValue, watch }: { dataType: string, register: any, setValue: any, watch: any }) => {
    const array = dataType == "Price" ? priceArray : durationArray;
    const type = dataType == "Price" ? "priceType" : "durationType";
    const typeValue = watch(type, array[0]);

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(dataType + "Type");

    useEffect(() => {
        setValue(type, typeValue);
    }, [typeValue, setValue, type]);

    // Manually close a dropdown
    function checkAndCloseDropDown(e: React.MouseEvent<HTMLButtonElement>, val: String) {
        let targetEl = e.currentTarget;
        if (targetEl && targetEl.matches(':focus')) {
            const newValue = val + "";
            setIsOpen(false);
            setTitle(newValue);
            setValue(type, newValue);
            setTimeout(function(){
                targetEl.blur();
            }, 0);
        }
    }

    return (
        <div className={`dropdown dropdown-bottom dropdown-center flex justify-center ${isOpen ? "dropdown-open" : ""}`}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="btn btn-outline btn-circle w-full px-2">
                {title} ▼
            </button>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full">
                <li><button type="button" onClick={(e) => { checkAndCloseDropDown(e, array[0]); register(type); }}>{dataType} by Day</button></li>
                <li><button type="button" onClick={(e) => { checkAndCloseDropDown(e, array[1]); register(type); }}>{dataType} by Month</button></li>
                <li><button type="button" onClick={(e) => { checkAndCloseDropDown(e, array[2]); register(type); }}>{dataType} by Year</button></li>
            </ul>
        </div>
    );
}

export default Dropdown;