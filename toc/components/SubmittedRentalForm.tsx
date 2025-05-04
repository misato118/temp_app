import { GetRenterInfoQuery } from "@/features/utils/graphql/typeDefs/graphql";
import Image from "next/image";
import { useEffect, useRef } from "react";

// yearly, monthly, daily
const priceDictionary: Record<string, string> = {
    "daily": "Day",
    "monthly": "Month",
    "yearly": "Year",
    "none": "Not Available"
};

type RenterApplicationData = NonNullable<
    GetRenterInfoQuery["renterInfo"]
>["renterApplications"][number];

type Props = {
    application: RenterApplicationData;
    onClose: () => void;
};

const SubmittedRentalForm = ({ application, onClose }: Props) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Modify here
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div className="modal modal-open" role="dialog" ref={modalRef}>
            <div className="modal-box px-12 flex flex-col items-center w-full max-w-xl">
                <h3 className="text-lg font-bold mb-3">Your Rental Application Form</h3>
                <Image src="/sampleImg.png" alt="Item Image" className="w-3/4 h-3/4" height={50} width={50} /> {/* TODO: Add an actual item image here */}
                <table className="table w-3/4 mx-auto my-4">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{application.item?.name}</td>
                        </tr>
                        <tr>
                            <th>Owner</th>
                            <td>{application.item?.company.name}</td>
                        </tr>
                        <tr>
                            <th>Asking Fee</th>
                            <td>{application.item?.feeType &&
                                (<>{application.item?.fee} /{priceDictionary[application.item?.feeType]}</>)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="mb-4">These are your offering price and rental duration.</p>
                <div>
                    <div className="grid grid-cols-8 gap-2 justify-center items-center mb-2">
                        <p className="col-span-2"></p>
                        <h3 className="col-span-2 font-semibold">Rental Duration</h3>
                        <p>{application.form?.offeringPrice}</p>
                        <p>{application.item?.feeType}</p>
                        <p className="col-span-2"></p>
                    </div>
                    <div className="grid grid-cols-8 gap-2 justify-center items-center mb-2">
                        <p className="col-span-2"></p>
                        <h3 className="col-span-2 font-semibold">Rental Duration</h3>
                        <p>{application.form?.offeringDuration}</p>
                        <p>{application.item?.maxDurationType}</p>
                        <p className="col-span-2"></p>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="btn btn-outline rounded-full" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubmittedRentalForm;