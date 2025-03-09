import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Range from "./Range";
import FilterDropdown from "./FilterDropdown";

const schema = z.object({
    maxPrice: z.number(),
    maxDuration: z.number(),
    priceType: z.string(),
    durationType: z.string()
})
  
type Schema = z.infer<typeof schema>

type FilterProps = {
    onFilterSubmit: (filters: { maxPrice?: number; maxDuration?: number; priceType?: string; durationType?: string }) => void;
};

const Filters: React.FC<FilterProps> = ({ onFilterSubmit }) => {
    const { register, getValues, setValue, watch, handleSubmit } = useForm<Schema>({
        defaultValues: {
            maxPrice: Number.MAX_SAFE_INTEGER,
            maxDuration: Number.MAX_SAFE_INTEGER,
            priceType: "daily",
            durationType: "days"
        },
    });
    
    const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
        const filters = {
            maxPrice: data.maxPrice ? Number(data.maxPrice) : undefined,
            maxDuration: data.maxDuration ? Number(data.maxDuration) : undefined,
            priceType: data.priceType.toLowerCase() || undefined,
            durationType: data.durationType.toLowerCase() || undefined,
          };
      
          onFilterSubmit(filters);
    }

    return (
        <div className="card bg-base-100 shadow-xl w-4/5 h-auto max-h-fit">
            <div className="card-body p-5">
                <h2 className="card-title">Filters</h2>
                <div className="divider my-1"></div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FilterDropdown dataType={"Price"} register={register} setValue={setValue} watch={watch} />
                    <Range range={[0, 50, 100, 150, 200]} register={register} setValue={setValue} watch={watch} />
                    <div className="divider my-1"></div>
                    <FilterDropdown dataType={"Duration"} register={register} setValue={setValue} watch={watch} />
                    <Range range={[0, 5, 10, 15, 20]} register={register} setValue={setValue} watch={watch} />

                    <div className="card-actions flex justify-center">
                        <input type="submit" value="Show Results" className="btn rounded-full bg-accent font-normal" onClick={() => {console.log(getValues())}}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Filters;