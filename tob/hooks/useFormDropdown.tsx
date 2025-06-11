import { useState, useEffect } from "react";

const feeArray = ["day", "month", "year"];
const maxDurationArray = ["days", "months", "years"];
type TimeType = "DA" | "MONTH" | "YEAR";

const useFormDropdown = (savedValue: string | null | undefined, dataType: string, setValue: any) => {
    const array = dataType === "FEE" ? feeArray : maxDurationArray;
    const type = dataType === "FEE" ? "feeType" : "maxDurationType";

    const [timeType, setTimeType] = useState<TimeType>("DA");
    const [initialValue, setInitialValue] = useState(savedValue);

    useEffect(() => {
        if (initialValue) {
            setTimeType(getTypeValue(initialValue));
            setInitialValue(undefined);
        } else {
            if (timeType === "YEAR") {
                setValue(type, array[2]);
            } else if (timeType === "MONTH") {
                setValue(type, array[1]);
            } else {
                setValue(type, array[0]);
            }
        }
    }, [timeType, setValue, type]);

    return {
        timeType,
        type,
        setTimeType
    }
}

export default useFormDropdown;

function getTypeValue(
    value: string
) {
    if (value.includes("year")) {
        return "YEAR";
    } else if (value.includes("month")) {
        return "MONTH";
    }
    
    return "DA";
}