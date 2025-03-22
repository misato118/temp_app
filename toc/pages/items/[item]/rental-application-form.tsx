import RootLayout from '@/components/Layout';
import RentForm from '@/components/RentForm';
import { NextPageWithLayout } from '@/pages/_app';
import { Item } from '@/types/types';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';

// yearly, monthly, daily
const priceDictionary: Record<string, string> = {
    "daily": "Day",
    "monthly": "Month",
    "yearly": "Year",
}; 

export const getServerSideProps = (async ({ query }) => {
    const itemId: number = query?.item ? Number(query?.item) : 0;
    const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        query: `
            query {
                itemInfo(itemId: ` + itemId + `) {
                    id
                    name
                    fee
                    feeType
                    maxDuration
                    maxDurationType
                    imageURL
                    company {
                        name
                    }
                }
            }
        `,
        }),
        next: { revalidate: 10 }
    })
    .then((res) => res.json());

    const item = data?.itemInfo;
    return { props: { item: JSON.parse(JSON.stringify(item)) } }
}) satisfies GetServerSideProps<{ item: Item }>

const RentalApplicationForm: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ item }: { item: Item }) => {
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
                                <td>{item.name}</td>
                            </tr>
                            <tr>
                                <th>Owner</th>
                                <td>{item.company.name}</td>
                            </tr>
                            <tr>
                                <th>Asking Fee</th>
                                <td>{item.fee} /{priceDictionary[item.feeType]}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mb-4">Please specify your offering price and rental duration to apply for this item.</p>
                    <div>
                        <RentForm feeType={item.feeType} maxDurationType={item.maxDurationType} />
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