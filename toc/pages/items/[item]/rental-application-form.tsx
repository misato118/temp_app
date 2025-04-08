import Error from '@/components/Error';
import RootLayout from '@/components/Layout';
import RentForm from '@/components/RentForm';
import { CreateRenterApplicationDocument } from '@/features/utils/graphql/typeDefs/graphql';
import useItemDetails from '@/hooks/useItemDetails';
import { NextPageWithLayout } from '@/pages/_app';
import { useMutation } from '@apollo/client';
import { ReactElement } from 'react';

// yearly, monthly, daily
const priceDictionary: Record<string, string> = {
    "daily": "Day",
    "monthly": "Month",
    "yearly": "Year",
};

const RentalApplicationForm: NextPageWithLayout = () => {
    const {
        loading,
        error,
        data,
    } = useItemDetails();

    if (loading) return 'Loading...';
    if (error || !data) {
        return (
            <Error />
        );
    }

    return (
        <div className="bg-base-200 h-full py-10 overflow-y-auto">
            <div className="card rounded-lg shadow-lg bg-white px-20 py-10 w-1/2 mx-auto text-center">
                <div className="card-body justify-center items-center text-center">
                    <h2 className="card-title text-4xl mb-4">Rental Application Form</h2>
                    <img src="/sampleImg.png" alt="Item Image" /> {/* TODO: Add an actual item image here */}
                    <table className="table w-3/4 mx-auto my-4">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{data?.itemInfo.name}</td>
                            </tr>
                            <tr>
                                <th>Owner</th>
                                <td>{data?.itemInfo.company.name}</td>
                            </tr>
                            <tr>
                                <th>Asking Fee</th>
                                <td>{data?.itemInfo.fee} /{priceDictionary[data?.itemInfo.feeType]}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mb-4">Please specify your offering price and rental duration to apply for this item.</p>
                    <div>
                        <RentForm feeType={data?.itemInfo.feeType} maxDurationType={data?.itemInfo.maxDurationType} />
                    </div>
                </div>
            </div>
        </div>
    );
}

RentalApplicationForm.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
}

export default RentalApplicationForm;