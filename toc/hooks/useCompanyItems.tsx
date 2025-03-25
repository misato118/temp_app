import { useRouter } from "next/router";
import { GetCompanyInfoQuery } from "@/features/utils/graphql/typeDefs/graphql";

export type CompanyItem = NonNullable<NonNullable<GetCompanyInfoQuery["companyInfo"]>["items"]>[number];

interface ItemsProps {
  items?: CompanyItem[] | null;
}

const useCompanyItems = (items: ItemsProps["items"]) => {
    const itemArr = items ? items : [];

    const overallRating = 4; // TODO: Add an actual overall rating of an item

    const router = useRouter();
    const itemsPerPage = 3;
    const currentPage = Number(router.query.page) || 1;
    const totalPages = Math.ceil(itemArr.length / itemsPerPage);
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = itemArr.slice(startIndex, startIndex + itemsPerPage);
  
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