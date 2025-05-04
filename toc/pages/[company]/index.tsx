import type { ReactElement } from 'react';
import { NextPageWithLayout } from "../_app";
import RootLayout from '@/components/Layout';
import OwnerDetailsWithoutButtons from '@/components/OwnerDetailsWithoutButtons';
import CompanyItems from '@/components/CompanyItems';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GetCompanyInfoDocument } from '@/features/utils/graphql/typeDefs/graphql';

const CompanyInfo: NextPageWithLayout = () => {
    const router = useRouter();
    // e.g., 'abc-company' to 'abc company'
    const companyName = typeof router.query?.company == 'string' && router.query?.company
        ? router.query.company.replace('-', ' ') : '';

    const { loading, error, data } = useQuery(GetCompanyInfoDocument, {
        variables: { companyName: companyName }
    });
        
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto bg-base-200 px-40 py-20">
            <div className="flex">
                <div className="w-1/3 flex justify-center"><OwnerDetailsWithoutButtons companyInfo={data?.companyInfo} /></div>
                <div className="flex justify-stretch"><CompanyItems items={data?.companyInfo?.items} /></div>
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