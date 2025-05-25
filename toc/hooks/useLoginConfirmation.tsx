import { GetRenterInfoDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const useLoginConfirmation = () => {
    const [renterId, setRenterId] = useState<number>(0);

    useEffect(() => {
        const storedId = localStorage.getItem("renterId");
        if (storedId !== null) {
            setRenterId(Number(storedId));
        }
    }, []);

    const { loading, error, data } = useQuery(GetRenterInfoDocument, {
        variables: { renterId },
        skip: renterId === 0
    });

    return {
        data,
        error,
        loading,
        renterId
    }
}

export default useLoginConfirmation;