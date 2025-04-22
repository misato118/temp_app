import ImageDisplay from "@/components/ImageDisplay";
import ItemDetails from "@/components/ItemDetails";
import RootLayout from "@/components/Layout";
import Reviews from "@/components/Reviews";
import SideNavigation from "@/components/SideNavigation";
import useItemDetails from "@/hooks/useItemDetails";
import { ReactElement } from "react";

const Item = () => {
    const {
        loading,
        error,
        data,
        activeTab,
        setActiveTab
    } = useItemDetails();

    if (loading) return 'Loading...';
    if (error) return `Error in the item details page! ${error.message}`;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-base-200 px-40 py-20">
            {/* Show a toast when user successfully submitted a rental applictaion form */}
            <div className="rounded-lg shadow-lg px-20 py-10 bg-white mx-10">
                <div className="flex justify-end">
                    <div className="badge badge-accent rounded-full">{data?.itemInfo?.ownerApplication?.status}</div>
                </div>
                <div className="flex">
                    <div className="w-1/2 px-10"><ImageDisplay /></div>
                    <div className="w-1/2 py-10">
                        <ItemDetails itemInfo={data?.itemInfo} />
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
                    {activeTab === "reviews" && <Reviews reviews={data?.itemInfo?.reviews} />}
                    {activeTab === "qa" && <p>This is the Q&A Chat content.</p>}
                </div>
            </div>
        </main>
    );
}

Item.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            <div className="flex w-full h-full">
                <SideNavigation />
                <div className="flex-1 overflow-y-auto p-10 bg-base-200">
                    {page}
                </div>
            </div>
        </RootLayout>
    );
}

export default Item;