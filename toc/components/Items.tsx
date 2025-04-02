import { GetAllItemsQuery } from "@/features/utils/graphql/typeDefs/graphql";
import usePagination from "@/hooks/usePagination";
import { NextRouter } from "next/router";

interface ItemsProps {
    items?: GetAllItemsQuery["items"];
}

const Items = ({ items }: ItemsProps) => {
    const {
        router,
        currentPage,
        totalPages,
        paginatedItems
    } = usePagination(items ?? [], "item");

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-6">
                {paginatedItems.map((item, index) => (
                    <div
                        key={item.id + index}
                        className="max-w-sm rounded-lg overflow-hidden shadow-lg px-6 py-4 bg-white cursor-pointer"
                        onClick={() =>
                            router.push({
                                pathname: "/items/[item]",
                                query: { item: item.id },
                            })
                        }
                    >
                        {/* Substitute this image with {item.imageURL}*/}
                        <img src="/sampleImg.png" alt="Item Image"></img>
                        <div className="divider w-5/6 mx-auto my-1"></div>
                        <div>
                            <p className="font-bold text-xl mb-2">{item.name}</p>
                            <p className="text-gray-700 text-base">
                                ${item.fee} {item.feeType}
                            </p>
                            <p className="text-gray-700 text-base">
                                {item.maxDuration} {item.maxDurationType}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="join grid grid-cols-2 mt-6">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1, totalPages, router)}
                    className={`join-item btn btn-outline ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Previous
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1, totalPages, router)}
                    className={`join-item btn btn-outline ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Items;

// Handle pagination navigation
function handlePageChange(
    newPage: number,
    totalPages: number,
    router: NextRouter
) {
    if (newPage >= 1 && newPage <= totalPages) {
        router.push({
            pathname: router.pathname,
            query: { page: newPage },
        });
    }
};