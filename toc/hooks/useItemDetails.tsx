import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GetItemInfoDocument } from '@/features/utils/graphql/typeDefs/graphql';

const useItemDetails = () => {
    const router = useRouter();
    const itemId: number = router.query?.item ? Number(router.query?.item) : 0;
    const renterId: number = router.query?.renterId ? Number(router.query?.renterId) : 0;

    const { loading, error, data } = useQuery(GetItemInfoDocument, {
        variables: { itemId: itemId }
    });
    const [activeTab, setActiveTab] = useState("reviews");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (router.query.showToast === "true") {
            setShowToast(true);
        }
    }, [router.query]);

    return {
        loading,
        error,
        data,
        activeTab,
        setActiveTab,
        showToast,
        renterId
    }
}

export default useItemDetails;