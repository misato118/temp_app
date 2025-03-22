import { Item } from "@/types/types";
import { useRouter } from "next/router";
import Rating from "./Rating";

const CompanyItems = ({ items }: { items: Item[] }) => {
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

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 grid-rows-3 gap-3">
                {paginatedItems.map((item) => (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body flex flex-row gap-4">
                            <div className="w-1/2">
                                {/* Substitute this image with {item.imageURL}*/}
                                <img src="/sampleImg.png" alt="Item Image" />
                            </div>
                            <div className="w-1/2">
                                <p className="font-bold text-xl mb-2">{item.name}</p>
                                <p className="text-gray-700 text-base">${item.fee} /{item.feeType}</p>
                                <div><Rating rating={overallRating} /></div>
                                <button
                                    className="py-1 btn rounded-full bg-info text-white font-normal mt-4"
                                    onClick={() => {
                                        router.push({
                                            pathname: "/items/[item]",
                                            query: { item: item.id }
                                        })
                                    }}
                                >Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    
            <div className="mt-6 flex items-center space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`btn bg-whilte ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Previous
                </button>
                <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`btn bg-whilte ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Next
                </button>
            </div>
        </div>        
    );
}

export default CompanyItems;