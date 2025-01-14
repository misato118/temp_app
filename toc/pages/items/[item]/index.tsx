import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from "../../_app";
import RootLayout from '@/components/Layout';

enum ItemCategory {
    FURNITURE,
    MUSIC,
    TOOL,
}

type Item = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: ItemCategory;
    fee: number;
    feeType: string;
    maxDuration: number;
    maxDurationType: string;
    imageURL: string;
    deposit: number;
}

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
        <main>
          <div>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>{item.fee}</p>
            <p>{item.feeType}</p>
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