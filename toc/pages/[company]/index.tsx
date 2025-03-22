import type { ReactElement } from 'react';
import { NextPageWithLayout } from "../_app";
import RootLayout from '@/components/Layout';
import OwnerDetailsWithoutButtons from '@/components/OwnerDetailsWithoutButtons';
import CompanyItems from '@/components/CompanyItems';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_COMPANY_INFO = gql`
    query GetCompanyInfo($companyName: String!) {
        companyInfo(companyName: $companyName) {
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
`;

const CompanyInfo: NextPageWithLayout = () => {
    const router = useRouter();
    // e.g., 'abc-company' to 'abc company'
    const companyName = typeof router.query?.company == 'string' && router.query?.company
        ? router.query.company.replace('-', ' ') : null;

    const { loading, error, data } = useQuery(GET_COMPANY_INFO, {
        variables: { companyName: companyName }
    });
        
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-base-200 px-40 py-20">
            <div className="flex">
                <div className="w-1/3 flex justify-center"><OwnerDetailsWithoutButtons company={data.companyInfo} /></div>
                <div className="w-2/3 flex"><CompanyItems items={data.companyInfo.items} /></div>
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