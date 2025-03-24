import { useEffect, useState } from 'react';
import type { Item } from '@/types/types';
import { useQuery } from '@apollo/client';
import { GetAllItemsDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useRouter } from "next/router";

const useHomeItems = () => {
    const router = useRouter();
    const { loading, error, data } = useQuery(GetAllItemsDocument, {
        variables: {
          filter: {
            maxDuration: Number(router.query.maxDuration),
            maxPrice: Number(router.query.maxPrice),
            durationType: typeof router.query.durationType === "string" ? router.query.durationType : undefined,
            priceType: typeof router.query.priceType === "string" ? router.query.priceType : undefined,
          },
        },
      });
    //const [filteredItems, setFilteredItems] = useState<Item[]>([]);
    //const [searchWords, setSearchWords] = useState("");

    return {
        loading,
        error,
        //filteredItems,
        //setFilteredItems,
        //searchWords,
        //setSearchWords,
        data
    }
}

export default useHomeItems;