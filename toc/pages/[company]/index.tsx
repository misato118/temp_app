import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from "../_app";
import RootLayout from '@/components/Layout';
import type { Company } from '@/types/types';
import OwnerDetailsWithoutButtons from '@/components/OwnerDetailsWithoutButtons';
import CompanyItems from '@/components/CompanyItems';

// TODO: Add item info as well after adding Item data to prisma
export const getServerSideProps = (async ({ query }) => {
    // e.g., 'abc-company' to 'abc company'
    const route = typeof query?.company == 'string' && query?.company
        ? query.company.replace('-', ' ') : null;
    // TODO: Add overall review for each item  
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
                    items {
                        id
                        name
                        fee
                        feeType
                        imageURL
                    }
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
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-base-200 px-40 py-20">
            <div className="flex">
                <div className="w-1/3 flex justify-center"><OwnerDetailsWithoutButtons company={company} /></div>
                <div className="w-2/3 flex"><CompanyItems items={company.items} /></div>
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