import AccountInfoCard from "@/components/AccountInfoCard";
import RootLayout from "@/components/Layout";
import ShippingInfoCard from "@/components/ShippingInfoCard";
import SideNavigation from "@/components/SideNavigation";
import { GetRenterInfoDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useQuery } from "@apollo/client";
import { ReactElement } from "react";

const Renter = () => {
    const { loading, error, data } = useQuery(GetRenterInfoDocument, {
            variables: { renterId: 1 }
        });

    return (
        <div className="flex flex-col items-center space-y-6">
            <AccountInfoCard data={data} />
            {/* TODO: Change this to a dynamic address when it's set */}
            {/* <ShippingInfoCard address={data?.renterInfo?.address} /> */}
            <ShippingInfoCard />
        </div>
    );
}

Renter.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            <div className="flex w-full h-full">
                <SideNavigation />
                <div className="flex-1 overflow-y-auto p-10 bg-base-200">
                    {page}
                </div>
            </div>
        </RootLayout>
    );
}

export default Renter;