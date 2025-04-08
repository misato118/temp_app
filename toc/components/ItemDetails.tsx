import { NextRouter, useRouter } from 'next/router';
import OwnerDetailsWithButtons from './OwnerDetailsWithButtons';
import { useState } from 'react';
import { MapPinIcon } from "@heroicons/react/24/outline";
import { GetItemInfoQuery } from '@/features/utils/graphql/typeDefs/graphql';

interface ItemsProps {
    itemInfo?: GetItemInfoQuery["itemInfo"];
    toast?: boolean;
}

const ItemDetails = ({ itemInfo, toast }: ItemsProps) => {
    const router = useRouter();
    // TODO: Check if the renter has already set their address
    const isAddressSet = true;
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [address, setAddress] = useState("");

    return (
        <div>
            <p className="font-bold text-2xl mb-2">{itemInfo?.name}</p>
            <p >{itemInfo?.category}</p>
            <div className="my-4">
                <button
                    className={`py-1 btn rounded-full bg-info text-white font-normal ${toast ? "btn-disabled" : ""}`}
                    disabled={toast}
                    onClick={() => router.push({
                        pathname: "/items/[item]/rental-application-form",
                        query: { item: itemInfo?.id }
                    })}>
                Apply for Rent</button>
                <button
                    onClick={() => {checkAddress(isAddressSet, router, itemInfo?.company?.name, setIsDeliveryModalOpen)}}
                    className="py-1 ml-2 btn rounded-full bg-white text-info border border-info font-normal">
                Estimated Delivery Fee</button>

                {isDeliveryModalOpen && (
                    <div className="modal modal-open" role="dialog">
                        <div className="modal-box px-12 flex flex-col items-center w-full max-w-xl">
                            <h3 className="text-lg font-bold">Oops, you have not provided your home address yet!</h3>
                            <p className="py-4">Please type your home address here</p>
                            <label className="input flex items-center mb-4">
                                <MapPinIcon className="w-5 h-5 text-gray-500" />
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type="text"
                                    className="grow ml-3"
                                    placeholder="Address" />
                            </label>

                            {/* TODO: Update the renter's address when clicked */}
                            <button
                                onClick={() => setIsDeliveryModalOpen(false)}
                                className="py-1 btn rounded-full bg-info text-white font-normal">Update</button>
                        </div>
                    </div>
                )}
            </div>
            <p>{itemInfo?.description}</p>
            <p className="my-2"><span className="font-bold text-xl mb-1">${itemInfo?.fee}</span> /{itemInfo?.feeType}</p>
            {/* TODO: Add review here */}
            <div className="collapse collapse-plus mt-4">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Max Duration</div>
                <div className="collapse-content text-sm">{itemInfo?.maxDuration} {itemInfo?.maxDurationType}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Deposit Fee</div>
                <div className="collapse-content text-sm">${itemInfo?.deposit}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Category</div>
                <div className="collapse-content text-sm">{itemInfo?.category}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Owner Details</div>
                <div className="collapse-content text-sm"><OwnerDetailsWithButtons company={itemInfo?.company} /></div>
            </div>
        </div>
    );
}

export default ItemDetails;

function checkAddress(
    isAddressSet: boolean,
    router: NextRouter,
    companyName: string | undefined,
    setIsDeliveryModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (isAddressSet) {
        router.push({
            pathname: "/delivery",
            // TODO: Fetch the renter's home address here
            query: { company: companyName, homeAddress: "104 Elephant St, Toronto, ON Q0C6W8" }
        });
    } else {
        setIsDeliveryModalOpen(true);
    }
};