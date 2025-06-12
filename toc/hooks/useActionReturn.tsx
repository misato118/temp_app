import { ChangeRenterAppStatusDocument, GetRenterInfoQuery, RenterApplicationStatusType } from "@/features/utils/graphql/typeDefs/graphql";
import { useMutation } from "@apollo/client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type RenterApplicationData = NonNullable<
    GetRenterInfoQuery["renterInfo"]
>["renterApplications"][number];

const schema = z.object({
    id: z.number(), // renter application ID
    status: z.nativeEnum(RenterApplicationStatusType)
});

export type Schema = z.infer<typeof schema>

const useActionReturn = (onClose: () => void, setSelectedApplication: Dispatch<SetStateAction<RenterApplicationData | null>>) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const { handleSubmit, setValue } = useForm<Schema>();
    const [createActionReturnMutation] = useMutation(ChangeRenterAppStatusDocument);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const onSubmit: SubmitHandler<Schema> = async (data: Schema) => {
        try {
            const response = await createActionReturnMutation({
                variables: {
                    changeRenterAppStatusInput: data
                }
            });

            if (response) {
                setSelectedApplication(null);
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.log("Mutation Error: " + error);
        }
    };


    return {
        modalRef,
        handleSubmit,
        onSubmit,
        setValue
    }
}

export default useActionReturn;