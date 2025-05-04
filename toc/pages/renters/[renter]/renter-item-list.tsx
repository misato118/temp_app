import ApplicationFilter from "@/components/ApplicationFilter";
import Error from "@/components/Error";
import RootLayout from "@/components/Layout";
import SideNavigation from "@/components/SideNavigation";
import SubmittedRentalForm from "@/components/SubmittedRentalForm";
import { GetRenterInfoDocument, GetRenterInfoQuery } from "@/features/utils/graphql/typeDefs/graphql";
import useLoginConfirmation from "@/hooks/useLoginConfirmation";
import usePagination from "@/hooks/usePagination";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { formatDistance } from "date-fns";
import { NextRouter } from "next/router";
import { ReactElement, useState } from "react";

type RenterApplicationData = NonNullable<
  GetRenterInfoQuery["renterInfo"]
>["renterApplications"][number];

// feature/add-user-item-list-page is branched from feature/add-user-page
const RenterItemList = () => {
    const {
        data,
        error,
        loading,
        renterId       
    } = useLoginConfirmation();

    if (loading) return 'Loading...';

    if (error || !data?.renterInfo) {
        return (
            <Error />
        );
    }

    const {
        router,
        currentPage,
        totalPages,
        paginatedItems
    } = usePagination(data?.renterInfo.renterApplications ?? [], "application");

    const [selectedApplication, setSelectedApplication] = useState<RenterApplicationData | null>(null);

    return (
        <div>
            <div className="flex justify-end mb-5">
                <button className="py-1 ml-2 btn rounded-full bg-accent text-white font-normal">Refresh <ArrowPathIcon className="h-5 w-5 ml-1 float-right" /></button>
            </div>
            <div className="flex flex-col items-center space-y-6">
                <div className="card bg-base-100 shadow-xl h-auto max-h-fit w-auto max-w-fit">
                    <div className="flex justify-end"><ApplicationFilter /></div>
                    <div className="card-body p-5 overflow-x-auto rounded-box border-base-content/5">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>Item ID</th>
                                    <th>Name</th>
                                    <th>Owner</th>
                                    <th>Status</th>
                                    <th>Return By</th>
                                    <th>Last Updated</th>
                                    <th>Next Action</th>
                                    <th>My Form</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedItems.map((application, index) => (
                                    <tr key={application.id + index}>
                                        <td>{application.item?.id}</td>
                                        <td>{application.item?.name}</td>
                                        <td>{application.item?.company.name}</td>
                                        <td>
                                            {application.renterApplicationStatuses?.length
                                                ? getFormattedDate(application.renterApplicationStatuses)?.status
                                                : "N/A"}
                                        </td>
                                        <td>Return by</td>
                                        <td>
                                            {application.renterApplicationStatuses?.length
                                                ? getFormattedDate(application.renterApplicationStatuses)?.date
                                                : "N/A"}
                                        </td>
                                        <td>
                                            {application.renterApplicationStatuses?.length
                                                ? getNextAction(
                                                    application.renterApplicationStatuses[application.renterApplicationStatuses.length - 1].status
                                                )
                                                : ""}
                                        </td>
                                        <td><a
                                                className="cursor-pointer"
                                                onClick={() => { setSelectedApplication(application) }}
                                            >View</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="join grid grid-cols-2 mt-6">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1, totalPages, router, renterId)}
                        className={`join-item btn btn-outline ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1, totalPages, router, renterId)}
                        className={`join-item btn btn-outline ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {selectedApplication && (
                <SubmittedRentalForm 
                    application={selectedApplication}
                    onClose={() => setSelectedApplication(null)}
                />
            )}
        </div>

    );
}

RenterItemList.getLayout = function getLayout(page: ReactElement) {
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

export default RenterItemList;

function getNextAction(currentStatus: string | null | undefined) {
    if (currentStatus === "RENTED") {
        return "Cannot return / Returned";
    } else if (currentStatus === "RETURNED" || currentStatus === "COMPLETED") {
        return "Review";
    }

    return "";
}

function getFormattedDate(
    statusArr: {
        id: number,
        status: string,
        updatedAt: Date,
    }[] | null | undefined
) {
    if (statusArr?.length) {
        const formattedDate = formatDistance(new Date(statusArr[statusArr.length - 1].updatedAt), new Date(), { addSuffix: true });

        return {
            status: statusArr[statusArr.length - 1].status,
            date: formattedDate            
        }
    }

    return;
}

// Handle pagination navigation
function handlePageChange(
    newPage: number,
    totalPages: number,
    router: NextRouter, 
    renterId: number
) {
    if (newPage >= 1 && newPage <= totalPages) {
        router.push({
            pathname: router.pathname,
            query: { renter: renterId, page: newPage },
        });
    }
};