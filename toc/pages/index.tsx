import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from "./_app";
import RootLayout from '@/components/Layout';
import type { Item } from '@/types/types';

export const getServerSideProps = (async () => {
    // Fetch data from external API
    const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        query: `
          query {
            item {
              id
              name
              category
              fee
              feeType
              maxDuration
              maxDurationType
              imageURL
            }
          }
        `,
        }),
        next: { revalidate: 10 }
    })
    .then((res) => res.json());

    const items = data?.item;

    // Pass data to the page via props
    return { props: { items: JSON.parse(JSON.stringify(items)) } }
}) satisfies GetServerSideProps<{ items: Item[] }>

const Home: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ items }: { items: Item[] }) => {
    return (
        <main>
          <div>
            {items.map((item) => (
              <>
                <Link legacyBehavior
                  href={{
                  pathname: '/items/[item]',
                  query: { item: item.id },
                }}>
                  <a>{item.id}</a>
                </Link>
                <p>{item.name}</p>
                <p>{item.imageURL}</p>
                <p>{item.fee} {item.feeType}</p>
                <p>{item.maxDuration} {item.maxDurationType}</p>
              </>
            ))}
          </div>
        </main>
      );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
}
  
export default Home;