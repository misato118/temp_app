import AccountInfoCard from "@/components/AccountInfoCard";
import Error from "@/components/Error";
import RootLayout from "@/components/Layout";
import ShippingInfoCard from "@/components/ShippingInfoCard";
import SideNavigation from "@/components/SideNavigation";
import { GetRenterInfoDocument } from "@/features/utils/graphql/typeDefs/graphql";
import { useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";

const Renter = () => {
    const [renterId, setRenterId] = useState<number>(0);

    useEffect(() => {
        const storedId = localStorage.getItem("renterId");
        if (storedId !== null) {
            setRenterId(Number(storedId));
        }        
    }, []);

    const { loading, error, data } = useQuery(GetRenterInfoDocument, {
            variables: { renterId },
            skip: renterId === 0
        });

    if (loading) return 'Loading...';

    if (error || !data?.renterInfo) {
        return (
            <Error />
        );
    }

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