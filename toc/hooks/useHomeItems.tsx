import { useEffect, useState } from 'react';
import type { Item } from '@/types/types';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_ITEMS = gql`
    query {
        item {
            id
            name
            category
            fee
            feeType
            maxDuration
            maxDurationType
            imageURL
        }
    }    
`;

const useHomeItems = () => {
    const { loading, error, data } = useQuery(GET_ALL_ITEMS);
    const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    const [searchWords, setSearchWords] = useState("");

    useEffect(() => {
        if (data?.item) {
            setFilteredItems(data.item);
        }
    }, [data]);

    return {
        loading,
        error,
        filteredItems,
        setFilteredItems,
        searchWords,
        setSearchWords,
        data
    }
}

export default useHomeItems;