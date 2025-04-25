import { ChangeRenterAppStatusInput, GetRenterApplicationListDocument, GetRenterApplicationListQuery, SaveAllRenterAppStatusesDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

export type RenterAppType = NonNullable<NonNullable<GetRenterApplicationListQuery["itemInfo"]>["renterApplications"]>[number];

// Color for each application badge
export const RenterApplicationStatusColor = {
    APPLIED: "warning",
    DECLINED: "error",
    ACCEPTED: "green-500",
    DELIVERED: "info",
    RENTED: "secondary",
    RETURNED: "success",
    COMPLETED: "neutral-content",
    UNAVAILABLE: "primary-content"
} as const;


const useRenterAppList = () => {
    const router = useRouter();
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [application, setApplication] = useState<RenterAppType | null>(null); // An application to show on a modal
    const [pendingChanges, setPendingChanges] = useState<ChangeRenterAppStatusInput[]>([]); // Save all changes here
    const [changeRenterAppStatusMutation] = useMutation(SaveAllRenterAppStatusesDocument);

    const { loading, error, data } = useQuery(GetRenterApplicationListDocument, {
        variables: { itemId: Number(router.query.item) }
    });


    return {
        router,
        isStatusModalOpen,
        setIsStatusModalOpen,
        application,
        setApplication,
        pendingChanges,
        setPendingChanges,
        changeRenterAppStatusMutation,
        loading,
        error,
        data
    }
}

export default useRenterAppList;