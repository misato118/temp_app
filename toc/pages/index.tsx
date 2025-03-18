import { type ReactElement } from 'react';
import { NextPageWithLayout } from "./_app";
import RootLayout from '@/components/Layout';
import type { Item } from '@/types/types';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Items from '@/components/Items';
import Filters from '@/components/Filters';
import CategoryDropdown from '@/components/CategoryDropdown';
import useHomeItems from '@/hooks/useHomeItems';

const Home: NextPageWithLayout = () => {
    const {
        loading,
        error,
        filteredItems,
        setFilteredItems,
        searchWords,
        setSearchWords,
        data
    } = useHomeItems();

    if (loading) return 'Loading...';
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
                    <input
                        value={searchWords}
                        onChange={(e) => setSearchWords(e.target.value)}
                        className="mx-2 input input-bordered rounded-full" />
                    <button className="py-1 ml-2 btn rounded-full bg-info text-white font-normal">Search <MagnifyingGlassIcon className="h-5 w-5 ml-1 float-right" /></button>
                </div>
            </div>
            <div className="flex bg-base-200 py-5">
                <div className="w-1/6 flex justify-center"><Filters onFilterSubmit={(filters) => handleFilterSubmit(filters, data, setFilteredItems)} /></div>
                <div className="w-5/6">
                    <div className="flex justify-between items-center mb-8">
                        <p className="text-sm font-medium">Results: {filteredItems?.length} items</p>
                        <div className="flex items-center scale-90">
                            <span className="mr-4">Sort By</span>
                            <CategoryDropdown />
                        </div>
                    </div>
                    <Items items={filteredItems} />
                </div>
            </div>
        </main>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
}

export default Home;

function handleFilterSubmit(
    filters: { priceType?: string; maxPrice?: number; durationType?: string; maxDuration?: number },
    data: { item: Item[] },
    setFilteredItems: React.Dispatch<React.SetStateAction<Item[]>>
) {
    const newFilteredItems = data.item.filter((item: Item) => {
        const isMaxFee = filters.maxPrice && item.fee > filters.maxPrice;
        const isMaxDuration = filters.maxDuration && item.maxDuration > filters.maxDuration;
        const isFeeType = filters.priceType && item.feeType !== filters.priceType;
        const isDurationType = filters.durationType && item.maxDurationType !== filters.durationType;

        return (
            !isMaxFee && !isMaxDuration && !isFeeType && !isDurationType
        );
    });
    setFilteredItems(newFilteredItems);
};