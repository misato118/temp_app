import useRange from "@/hooks/useRange";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Schema } from "./Filters";

type DataType = "PRICE" | "DURATION";

interface RangeProps {
    dataType: DataType;
    range: number[];
    register: UseFormRegister<Schema>;
    setValue: UseFormSetValue<Schema>;
    watch: UseFormWatch<Schema>;
}

// This is a range slider component with a max handle
const Range = ({ dataType, range, register, setValue, watch }: RangeProps) => {
    const { registerName, maxValue } = useRange(range, setValue, watch);

    return (
        <div>
            <input
                {...register(registerName, { valueAsNumber: true })}
                type="range"
                min={0}
                max={range[range.length - 1]}
                value={maxValue}
                onChange={(e) => handleMaxChange(e, dataType, setValue)}
                className="range range-info"
                step="1" />

            <div className="flex w-full justify-between px-2 text-xs">
                {range.map((num, index) => (
                    <span key={num + index}>{num}+</span>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    {...register(registerName, { valueAsNumber: true })}
                    value={maxValue}
                    onChange={(e) => handleMaxChange(e, dataType, setValue)}
                    type="number"
                    placeholder="Max"
                    className="input input-bordered w-full rounded-full mt-2" />
            </div>
        </div>
    );
}

export default Range;

function handleMaxChange(
    e: React.ChangeEvent<HTMLInputElement>,
    dataType: DataType,
    setValue: UseFormSetValue<{
        maxPrice: number;
        maxDuration: number;
        priceType: string;
        durationType: string;
    }>
) {
    const value = Number(e.target.value);
    const registerName = dataType === "PRICE" ? "maxPrice" : "maxDuration";

    setValue(registerName, value);
};