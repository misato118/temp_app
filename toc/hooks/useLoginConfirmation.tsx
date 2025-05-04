import { GetRenterInfoDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const useLoginConfirmation = () => {
    const [renterId, setRenterId] = useState<number | null>(null);

    useEffect(() => {
        const storedId = localStorage.getItem("renterId");
        if (storedId !== null) {
            setRenterId(Number(storedId));
        }
    }, []);

    const { loading, error, data } = useQuery(GetRenterInfoDocument, {
        variables: { renterId: renterId ?? 0 },
        skip: renterId === null
    });

    return {
        data,
        error,
        loading,
        renterId
    }
}

export default useLoginConfirmation;