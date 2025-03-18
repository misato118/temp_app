import useRange from "@/hooks/useRange";
import { UseFormSetValue } from "react-hook-form";

// This is a range slider component with a max handle
const Range = ({ range, register, setValue, watch }: { range: number[], register: any, setValue: any, watch: any }) => {
    const { registerName, maxValue } = useRange(range, setValue, watch);

    return (
        <div>
            <input
                {...register(registerName, { valueAsNumber: true })}
                type="range"
                min={0}
                max={range[range.length - 1]}
                value={maxValue}
                onChange={handleMaxChange}
                className="range range-info"
                step="1" />

            <div className="flex w-full justify-between px-2 text-xs">
                {range.map((num) => (
                    <span>{num}+</span>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    {...register(registerName, { valueAsNumber: true })}
                    value={maxValue}
                    onChange={handleMaxChange}
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
    registerName: "maxPrice" | "maxDuration",
    setValue: UseFormSetValue<{
        maxPrice: number;
        maxDuration: number;
        priceType: string;
        durationType: string;
    }>
) {
    const value = Number(e.target.value);
    setValue(registerName, value);
};