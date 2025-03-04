import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from "../../_app";
import RootLayout from '@/components/Layout';
import type { Item } from '@/types/types';
import ImageDisplay from '@/components/ImageDisplay';
import ItemDetails from '@/components/ItemDetails';

export const getServerSideProps = (async ({ query }) => {
    const itemId: number = query?.item ? Number(query?.item) : 0;
    // Fetch data from external API
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
                    }
                }
            }
        `,
        }),
        next: { revalidate: 10 }
    })
    .then((res) => res.json());

    const item = data?.itemInfo;

    // Pass data to the page via props
    return { props: { item: JSON.parse(JSON.stringify(item)) } }
}) satisfies GetServerSideProps<{ item: Item }>

const Item: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ item }: { item: Item }) => {
    return (
        <main className="flex justify-center items-center h-screen bg-base-200 px-40 py-20">
            <div className="rounded-lg overflow-hidden shadow-lg px-20 py-10 bg-white mx-10">
                <div className="flex">
                    <div className="w-1/2 px-10"><ImageDisplay /></div>
                    <div className="w-1/2 py-10">
                        <ItemDetails item={item}/>
                    </div>
                </div>

                <div role="tablist" className="tabs tabs-border">
                    {/* TODO: Add reviews here */}
                    <a role="tab" className="tab tab-active">Reviews</a>
                    {/* TODO: Add Q&A chat history here */}
                    <a role="tab" className="tab">Q&A Chat</a>
                </div>

                {/*
                {item.reviews.map((review) => (
                    <p>{review.title}</p>
                ))}
                */}
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