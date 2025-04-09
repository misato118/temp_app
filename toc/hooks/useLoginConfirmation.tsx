import { GetRenterInfoDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useQuery } from "@apollo/client";

const useLoginConfirmation = () => {
    const storedId = localStorage.getItem("renterId");
    const renterId = storedId !== null ? Number(storedId) : 0;
    const { loading, error, data } = useQuery(GetRenterInfoDocument, {
        variables: { renterId: renterId }
    });

    return {
        data,
        error,
        loading,
        renterId
    }
}

export default useLoginConfirmation;