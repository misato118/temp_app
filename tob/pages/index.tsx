import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from "./_app";
import RootLayout from '@/components/Layout';
import type { Item } from '@/types/types';

export const getServerSideProps = (async () => {
  // TODO: Take a company name from user's (employee's) login info
  const companyName = 'ABC Company';
  // Fetch data from external API
  const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query {
            itemByCompany(companyName: "` + companyName + `") {
              items {
                name
                updatedAt
                ownerApplication {
                  status
                }
                renterApplications {
                  createdAt
                  renter {
                    firstName
                  }
                }
              }
            }
          }
        `,
    }),
    next: { revalidate: 10 }
  })
    .then((res) => res.json());

  const items = data?.itemByCompany?.items;

  // Pass data to the page via props
  return { props: { items: JSON.parse(JSON.stringify(items)) } }
}) satisfies GetServerSideProps<{ items: Item[] }>

const Home: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ items }: { items: Item[] }) => {
  return (
    <main>
      <div>
        {items.map((item) => (
          <>
            <p>{item.name}</p>
            <p>{item.updatedAt.toString()}</p>
            <p>{item.ownerApplication.status}</p>
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