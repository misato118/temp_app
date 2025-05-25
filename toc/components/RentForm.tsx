import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CreateRenterApplicationDocument } from "@/features/utils/graphql/typeDefs/graphql";

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
    const router = useRouter();
    const { register, handleSubmit } = useForm<Schema>({
        defaultValues: {
            offeringPrice: 0,
            offeringDuration: 0,
        },
    });

    const [createRenterApplicationMutation] = useMutation(CreateRenterApplicationDocument);

    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        try {
            const response = await createRenterApplicationMutation({
                variables: {
                    createRenterApplicationInput: {
                        renterId: 1,
                        itemId: Number(router.query.item),
                        offeringPrice: data.offeringPrice,
                        offeringDuration: data.offeringDuration
                    }
                }
            });

            console.log(response);
            router.push({
                pathname: `/items/${Number(router.query.item)}`,
                query: { showToast: "true" }
            });
        } catch (error) {
            console.log("Mutation Error: " + error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-9 gap-2 justify-center items-center mb-2">
                <h3 className="col-span-2 font-semibold">Offering Fee</h3>
                <label className="input rounded-full bg-white border border-neutral-content flex flex-row items-center col-span-4">
                    <p className="px-2">$</p>
                    <input
                        type="number"
                        min="0"
                        className="rounded-full pl-1"
                        placeholder="Type here"
                        {...register("offeringPrice", { valueAsNumber: true })}
                        />
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
                <input
                    type="number"
                    min="0"
                    className="input input-bordered rounded-full mt-2 col-span-4"
                    placeholder="Type here"                   
                    {...register("offeringDuration", { valueAsNumber: true })}
                    />
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