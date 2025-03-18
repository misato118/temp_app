import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_ITEM_INFO = gql`
    query GetItemInfo($itemId: Int!) {
        itemInfo(itemId: $itemId) {
            id
            name
            description
            createdAt
            category
            fee
            feeType
            maxDuration
            maxDurationType
            imageURL
            deposit
            company {
                name
                logoURL
                description
            }
            reviews {
                title
                contents
                rating
            }
        }
    } 
`;

const useItemDetails = () => {
    const router = useRouter();
    const itemId: number = router.query?.item ? Number(router.query?.item) : 0;

    const { loading, error, data } = useQuery(GET_ITEM_INFO, {
        variables: { itemId: itemId }
    });
    const [activeTab, setActiveTab] = useState("reviews");

    return {
        loading,
        error,
        data,
        activeTab,
        setActiveTab
    }
}

export default useItemDetails;