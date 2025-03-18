import useFilterDropdown from "@/hooks/useFilterDropdown";
import { UseFormRegister } from "react-hook-form";

// Dropdown for price/duration
const FilterDropdown = ({ dataType, register, setValue, watch }: { dataType: string, register: any, setValue: any, watch: any }) => {
    const {
        title,
        isOpen,
        array,
        type,
        setIsOpen,
        setTitle        
    } = useFilterDropdown(dataType, register, setValue, watch);

    return (
        <div className={`dropdown dropdown-bottom dropdown-center flex justify-center ${isOpen ? "dropdown-open" : ""}`}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="btn btn-outline btn-circle w-full px-2">
                {title} ▼
            </button>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full">
                <li><button type="button" onClick={(e) => { checkAndCloseDropDown(e, array[0], setIsOpen, setTitle); register(type); }}>{dataType} by Day</button></li>
                <li><button type="button" onClick={(e) => { checkAndCloseDropDown(e, array[1], setIsOpen, setTitle); register(type); }}>{dataType} by Month</button></li>
                <li><button type="button" onClick={(e) => { checkAndCloseDropDown(e, array[2], setIsOpen, setTitle); register(type); }}>{dataType} by Year</button></li>
            </ul>
        </div>
    );
}

export default FilterDropdown;

// Manually close a dropdown
function checkAndCloseDropDown(
    e: React.MouseEvent<HTMLButtonElement>,
    val: String,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>
) {
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
        const newValue = val + "";
        setIsOpen(false);
        setTitle(newValue);
        setTimeout(function () {
            targetEl.blur();
        }, 0);
    }
}