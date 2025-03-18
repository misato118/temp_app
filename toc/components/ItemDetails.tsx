import type { Item } from '@/types/types';
import { NextRouter, useRouter } from 'next/router';
import OwnerDetailsWithButtons from './OwnerDetailsWithButtons';
import { useState } from 'react';
import { MapPinIcon } from "@heroicons/react/24/outline";

interface ItemsProps {
    item: Item;
}

const ItemDetails = ({ item }: ItemsProps) => {
    const router = useRouter();
    // TODO: Check if the renter has already set their address
    const isAddressSet = true;
    const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
    const [address, setAddress] = useState("");

    return (
        <div>
            <p className="font-bold text-2xl mb-2">{item.name}</p>
            <p >{item.category}</p>
            <div className="my-4">
                <button
                    className="py-1 btn rounded-full bg-info text-white font-normal"
                    onClick={() => router.push({
                        pathname: "/items/[item]/rental-application-form",
                        query: { item: item.id }
                    })}>
                Apply for Rent</button>
                <button
                    onClick={() => {checkAddress(isAddressSet, router, item, setIsDeliveryModalOpen)}}
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
            <p>{item.description}</p>
            <p className="my-2"><span className="font-bold text-xl mb-1">${item.fee}</span> /{item.feeType}</p>
            {/* TODO: Add review here */}
            <div className="collapse collapse-plus mt-4">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Max Duration</div>
                <div className="collapse-content text-sm">{item.maxDuration} {item.maxDurationType}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Deposit Fee</div>
                <div className="collapse-content text-sm">${item.deposit}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Category</div>
                <div className="collapse-content text-sm">{item.category}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Owner Details</div>
                <div className="collapse-content text-sm"><OwnerDetailsWithButtons company={item.company} /></div>
            </div>
        </div>
    );
}

export default ItemDetails;

function checkAddress(
    isAddressSet: boolean,
    router: NextRouter,
    item: Item,
    setIsDeliveryModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    if (isAddressSet) {
        router.push({
            pathname: "/delivery",
            // TODO: Fetch the renter's home address here
            query: { company: item.company.name, homeAddress: "104 Elephant St, Toronto, ON Q0C6W8" }
        });
    } else {
        setIsDeliveryModalOpen(true);
    }
};