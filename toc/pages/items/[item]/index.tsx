import { useState, type ReactElement } from 'react';
import { NextPageWithLayout } from "../../_app";
import RootLayout from '@/components/Layout';
import type { Item } from '@/types/types';
import ImageDisplay from '@/components/ImageDisplay';
import ItemDetails from '@/components/ItemDetails';
import Reviews from '@/components/Reviews';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_ITEM_INFO = gql`
    query GetItemInfo($itemId: Int!) {
        itemInfo(itemId: $itemId) {
            id
            name
            description
            createdAt
            category
            fee
            feeType
            maxDuration
            maxDurationType
            imageURL
            deposit
            company {
                name
                logoURL
                description
            }
            reviews {
                title
                contents
                rating
            }
        }
    } 
`;

const Item: NextPageWithLayout = () => {
    const router = useRouter();
    const itemId: number = router.query?.item ? Number(router.query?.item) : 0;

    const { loading, error, data } = useQuery(GET_ITEM_INFO, {
        variables: { itemId: itemId }
    });
    const [activeTab, setActiveTab] = useState("reviews"); 

    if (loading) return 'Loading...';
    if (error) return `Error in the item details page! ${error.message}`;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-base-200 px-40 py-20">
            <div className="rounded-lg shadow-lg px-20 py-10 bg-white mx-10">
                <div className="flex">
                    <div className="w-1/2 px-10"><ImageDisplay /></div>
                    <div className="w-1/2 py-10">
                        <ItemDetails item={data.itemInfo} />
                    </div>
                </div>

                <div role="tablist" className="tabs tabs-bordered flex">
                    <a
                        role="tab"
                        className={`tab w-1/6 ${activeTab === "reviews" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("reviews")}
                    >Reviews</a>
                    {/* TODO: Add Q&A chat history here */}
                    <a
                        role="tab"
                        className={`tab w-1/6 ${activeTab === "qa" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("qa")}
                    >Q&A Chat</a>
                </div>

                <div className="p-4 mt-4">
                    {activeTab === "reviews" && <Reviews reviews={data.itemInfo.reviews} />}
                    {activeTab === "qa" && <p>This is the Q&A Chat content.</p>}
                </div>
            </div>
        </main>
    );
}

Item.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
}

export default Item;