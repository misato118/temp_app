import { FormEvent } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

// yearly, monthly, daily
const priceDictionary: Record<string, string> = {
    "daily": "Day",
    "monthly": "Month",
    "yearly": "Year",
}; 

const schema = z.object({
    offeringPrice: z.number(),
    offeringDuration: z.number(),
})

type Schema = z.infer<typeof schema>

const RentForm = ({ feeType, maxDurationType }: { feeType: string, maxDurationType: string }) => {
    const { register, getValues, setValue, watch, handleSubmit } = useForm<Schema>({
        defaultValues: {
            offeringPrice: 0,
            offeringDuration: 0,
        },
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submitRentForm', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json()
        // TODO: Deal with the returned data
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-9 gap-2 justify-center items-center mb-2">
                <h3 className="col-span-2 font-semibold">Offering Fee</h3>
                <label className="input rounded-full bg-white border border-neutral-content flex flex-row items-center mx-4 col-span-4">
                    <p className="px-2">$</p>
                    <input
                        name="fee"
                        type="number"
                        className="rounded-full pl-1"
                        placeholder="Type here" />
                </label>
                <button type="button" className="py-1 btn rounded-full bg-white border border-neutral-content col-span-2" disabled={true}>
                    /{priceDictionary[feeType]}
                </button>
                <div className="tooltip col-span-1 inline-block flex justify-center tooltip-info" data-tip="You can negotiate a fee. The frequency is fixed by the company.">
                    <QuestionMarkCircleIcon className="h-7 w-7 text-info" />
                </div>
            </div>

            <div className="grid grid-cols-9 gap-2 justify-center items-center mb-2">
                <h3 className="col-span-2 font-semibold">Rental Duration</h3>
                <input type="number" name="duration" placeholder="Type here" className="input input-bordered rounded-full mt-2 mx-4 col-span-4" />
                <button type="button" className="py-1 btn rounded-full bg-white border border-neutral-content col-span-2" disabled={true}>
                    {maxDurationType.charAt(0).toUpperCase() + maxDurationType.slice(1)}
                </button>
                <div className="tooltip col-span-1 inline-block flex justify-center tooltip-info" data-tip="You can set an ideal rental duration. The frequency is fixed by the company.">
                    <QuestionMarkCircleIcon className="h-7 w-7 text-info" />
                </div>
            </div>

            <button className="py-1 btn rounded-full bg-accent bg-neutral-content mt-4 mr-1">Cancel</button>
            <button type="submit" className="py-1 btn rounded-full bg-accent mt-4 ml-1">Submit</button>
        </form>
    );
}

export default RentForm;