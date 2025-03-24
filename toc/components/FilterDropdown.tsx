import useFilterDropdown from "@/hooks/useFilterDropdown";

type DataType = "PRICE" | "DURATION";
type TimeType = "TYPE" | "DA" | "MONTH" | "YEAR";

enum PriceTime {
    TYPE = "Price",
    DA = "Daily",
    MONTH = "Monthly",
    YEAR = "Yearly"
}

enum DurationTime {
    TYPE = "Duration",
    DA = "Days",
    MONTH = "Months",
    YEAR = "Years"
}

// Dropdown for price/duration
const FilterDropdown = ({ dataType, setValue }: { dataType: DataType, setValue: any }) => {
    const {
        timeType,
        type,
        setTimeType
    } = useFilterDropdown(dataType, setValue);

    return (
        <div className="dropdown dropdown-bottom dropdown-center flex justify-center">
            <button type="button" className="btn btn-outline btn-circle w-full px-2">
                {getButtonLabel(timeType, type)}
            </button>

            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full">
                <li><button type="button" onClick={(e) => checkAndCloseDropDown(e, "DA", setTimeType)}>{dataType} by Day</button></li>
                <li><button type="button" onClick={(e) => checkAndCloseDropDown(e, "MONTH", setTimeType)}>{dataType} by Month</button></li>
                <li><button type="button" onClick={(e) => checkAndCloseDropDown(e, "YEAR", setTimeType)}>{dataType} by Year</button></li>
            </ul>
        </div>
    );
}

export default FilterDropdown;

// Manually close a dropdown
function checkAndCloseDropDown(
    e: React.MouseEvent<HTMLButtonElement>,
    val: TimeType,
    setCategoryType: React.Dispatch<React.SetStateAction<TimeType>>
) {
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
        setCategoryType(val);
        setTimeout(function () {
            targetEl.blur();
        }, 0);
    }
}

// Get a dropdown label
function getButtonLabel(
    typeValue: TimeType,
    type: string
) {
    if (type === "priceType") {
        if (typeValue === "TYPE") {
            return "Price ▼";
        }
        return PriceTime[typeValue as keyof typeof PriceTime];
    }

    if (type === "durationType") {
        if (typeValue === "TYPE") {
            return "Duration ▼";
        }
        return DurationTime[typeValue as keyof typeof DurationTime];
    }
}