import { useRouter } from "next/router";
import { Item } from "@/types/types";

const useCompanyItems = (items: Item[]) => {
    const overallRating = 4; // TODO: Add an actual overall rating of an item

    const router = useRouter();
    const itemsPerPage = 3;
    const currentPage = Number(router.query.page) || 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  
    const handlePageChange = (newPage: number) => {
      router.push({
        pathname: router.pathname,
        query: { page: newPage },
      });
    };

    return {
        paginatedItems,
        overallRating,
        router,
        currentPage,
        totalPages,
        handlePageChange
    }
}

export default useCompanyItems;