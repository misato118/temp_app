import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from "../_app";
import RootLayout from '@/components/Layout';

type Company = {
  id: number;
  name: string;
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  logoURL: string;
}

// TODO: Add item info as well after adding Item data to prisma
export const getServerSideProps = (async ({ query }) => {
    // e.g., 'abc-company' to 'abc company'
    const route = typeof query?.company == 'string' && query?.company
        ? query.company.replace('-', ' ') : null;
    // Fetch data from external API
    const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        query: `
            query {
            companyInfo(companyName: "` + route + `") {
                id
                name
                description
                createdAt
                logoURL
            }
            }
        `,
        }),
        next: { revalidate: 10 }
    })
    .then((res) => res.json());

    const company = data?.companyInfo;

    // Pass data to the page via props
    return { props: { company: JSON.parse(JSON.stringify(company)) } }
}) satisfies GetServerSideProps<{ company: Company }>

const CompanyInfo: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ company }: { company: Company }) => {
    return (
        <main>
          <div>
            <p>{company.name}</p>
            <p>{company.description}</p>
            <p>{company.createdAt.toString()}</p>
            <p>{company.logoURL}</p>
          </div>
        </main>
      );
}

CompanyInfo.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
  }
  
  export default CompanyInfo;