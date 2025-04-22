import ItemForm from "@/components/ItemForm";
import RootLayout from "@/components/Layout";
import SideNavigation from "@/components/SideNavigation";
import {
    DeleteConversationsDocument,
    DeleteConversationsMutation,
    DeleteConversationsMutationVariables,
    DeleteItemDocument,
    DeleteItemMutation,
    DeleteItemMutationVariables,
    DeleteOwnerApplicationsDocument,
    DeleteOwnerApplicationsMutation,
    DeleteOwnerApplicationsMutationVariables,
    DeleteRenterApplicationsDocument,
    DeleteRenterApplicationsMutation,
    DeleteRenterApplicationsMutationVariables,
    DeleteReviewsDocument,
    DeleteReviewsMutation,
    DeleteReviewsMutationVariables,
    DeleteStockStatusesDocument,
    DeleteStockStatusesMutation,
    DeleteStockStatusesMutationVariables,
    GetApplicationFormDocument
} from "@/features/utils/graphql/typeDefs/graphql";
import { MutationFunction, useMutation, useQuery } from "@apollo/client";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ItemApplicationForm = () => {
    const router = useRouter();
    const { item } = router.query;

    const [deleteItem] = useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
    const [deleteStockStatuses] = useMutation<DeleteStockStatusesMutation, DeleteStockStatusesMutationVariables>(DeleteStockStatusesDocument);
    const [deleteConversations] = useMutation<DeleteConversationsMutation, DeleteConversationsMutationVariables>(DeleteConversationsDocument);
    const [deleteOwnerApplications] = useMutation<DeleteOwnerApplicationsMutation, DeleteOwnerApplicationsMutationVariables>(DeleteOwnerApplicationsDocument);
    const [deleteRenterApplications] = useMutation<DeleteRenterApplicationsMutation, DeleteRenterApplicationsMutationVariables>(DeleteRenterApplicationsDocument);
    const [deleteReviews] = useMutation<DeleteReviewsMutation, DeleteReviewsMutationVariables>(DeleteReviewsDocument);

    const { loading, error, data } = useQuery(GetApplicationFormDocument, {
        variables: { itemId: Number(item) }
    });

    if (loading) return `Loading...`;
    if (error) return `Error! ${error}`;

    return (
        <div className="bg-base-200 h-full py-10 overflow-y-auto">
            <div className="card rounded-lg shadow-lg bg-white px-20 py-10 w-1/2 mx-auto">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div>
                            <button
                                className="py-1 btn rounded-full bg-error"
                                onClick={async () => {
                                    const success = await deleteDraft(
                                        deleteItem,
                                        deleteStockStatuses,
                                        deleteConversations,
                                        deleteOwnerApplications,
                                        deleteRenterApplications,
                                        deleteReviews,
                                        Number(item));
                                
                                    if (success) {
                                        router.push({
                                            pathname: `/${router.query.company}/${router.query.employee}`,
                                        });
                                    } else {
                                        router.push({
                                            pathname: `/${router.query.company}/${router.query.employee}`,
                                        });
                                    }
                                }}
                            ><TrashIcon className="h-5 w-5 float-left" />Delete</button>
                        </div>
                        <div className="badge badge-warning rounded-full">Draft</div>
                    </div>
                    <ItemForm savedData={data} />
                </div>
            </div>
        </div>
    );
}

ItemApplicationForm.getLayout = function getLayout(page: ReactElement) {
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

export default ItemApplicationForm;

// This deletes an item and its stock status
async function deleteDraft(
    deleteItem: MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>,
    deleteStockStatuses: MutationFunction<DeleteStockStatusesMutation, DeleteStockStatusesMutationVariables>,
    deleteConversations: MutationFunction<DeleteConversationsMutation, DeleteConversationsMutationVariables>,
    deleteOwnerApplications: MutationFunction<DeleteOwnerApplicationsMutation, DeleteOwnerApplicationsMutationVariables>,
    deleteRenterApplications: MutationFunction<DeleteRenterApplicationsMutation, DeleteRenterApplicationsMutationVariables>,
    deleteReviews: MutationFunction<DeleteReviewsMutation, DeleteReviewsMutationVariables>,
    itemId: number
) {
    try {
        // Delete other data that references itemId
        await deleteStockStatuses({ variables: { itemId: Number(itemId) } });
        await deleteConversations({ variables: { itemId: Number(itemId) } });
        await deleteOwnerApplications({ variables: { itemId: Number(itemId) } });
        await deleteRenterApplications({ variables: { itemId: Number(itemId) } });
        await deleteReviews({ variables: { itemId: Number(itemId) } });

        // Delete an item at the end
        await deleteItem({ variables: { itemId: Number(itemId) } });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}