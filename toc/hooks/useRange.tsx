import { useEffect } from "react";

const useRange = (range: number[], setValue: any, watch: any) => {
    const registerName = range[range.length - 1] >= 100 ? "maxPrice" : "maxDuration";
    const maxValue = watch(registerName, 75);

    useEffect(() => {
        setValue(registerName, maxValue);
    }, [maxValue, setValue, registerName]);

    return {
        registerName,
        maxValue
    }
}

export default useRange;