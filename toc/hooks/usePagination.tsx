import { useRouter } from "next/router";

type PaginationMode = "item" | "application";

const usePagination = <T,>(data: T[], mode: PaginationMode) => {
    const router = useRouter();

    // 3 columns x 2 rows for items (main page), and 10 for applications (user apps page)
    const DATA_COUNT_PER_PAGE = mode === "item" ? 6 : 10;
    const currentPage = Number(router.query.page) || 1;
    const totalPages = Math.ceil((data || []).length / DATA_COUNT_PER_PAGE);

    // Slice items for current page
    const startIndex = (currentPage - 1) * DATA_COUNT_PER_PAGE;
    const paginatedItems = (data || []).slice(
        startIndex,
        startIndex + DATA_COUNT_PER_PAGE
    );    
    
    return {
        router,
        currentPage,
        totalPages,
        paginatedItems
    }
}

export default usePagination;