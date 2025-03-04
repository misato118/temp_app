import Item from "@/pages/items/[item]";
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from "next/router";

interface ItemsProps {
    items: Item[];
}

const Items = ({ items }: ItemsProps) => {
  const router = useRouter();
  const itemsPerPage = 6; // 3 columns x 2 rows
  const currentPage = Number(router.query.page) || 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Slice items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Handle pagination navigation
  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-6">
        {paginatedItems.map((item) => (
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg px-6 py-4 bg-white">
            {/* Substitute this image with {item.imageURL}*/}
            <img src="/sampleImg.png" alt="Item Image"></img>
            <div className="divider w-5/6 mx-auto my-1"></div>
            <div>
              {/*
              <div className="font-bold text-xl mb-2">
                <Link legacyBehavior
                  href={{
                  pathname: '/items/[item]',
                  query: { item: item.id },
                }}>
                  <a>{item.id}</a>
                </Link>
              </div>              
              */}
              <p className="font-bold text-xl mb-2">{item.name}</p>
              <p className="text-gray-700 text-base">${item.fee} {item.feeType}</p>
              <p className="text-gray-700 text-base">{item.maxDuration} {item.maxDurationType}</p>
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

export default Items;