import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Items from "@/components/Items";
import Filters from "@/components/Filters";
import CategoryDropdown from "@/components/CategoryDropdown";
import { useQuery } from "@apollo/client";
import { GetAllItemsDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useRouter } from "next/router";

const Home = () => {
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

  if (loading) return "Loading...";
  if (error) return `Error in the main page! ${error.message}`;

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Search area */}
      <div className="my-10">
        <div className="flex justify-center">
          <h2 className="text-5xl font-semibold tracking-wide">Search Items</h2>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 text-lg font-medium text-pretty">
            Find items you would like to rent for a reasonable price
          </p>
        </div>
        <div className="flex justify-center mt-8 ">
          <CategoryDropdown />
          <input className="mx-2 input input-bordered rounded-full" />
          <button className="py-1 ml-2 btn rounded-full bg-info text-white font-normal">
            Search <MagnifyingGlassIcon className="h-5 w-5 ml-1 float-right" />
          </button>
        </div>
      </div>
      <div className="flex bg-base-200 py-5">
        <div className="w-1/6 flex justify-center">
          <Filters />
        </div>
        <div className="w-5/6">
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm font-medium">
              Results: {data?.items?.length} items
            </p>
            <div className="flex items-center scale-90">
              <span className="mr-4">Sort By</span>
              <CategoryDropdown />
            </div>
          </div>
          <Items items={data?.items} />
        </div>
      </div>
    </main>
  );
};

export default Home;
