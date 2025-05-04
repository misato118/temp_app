import { GetCompanyInfoQuery } from "@/features/utils/graphql/typeDefs/graphql";
import Image from "next/image";

interface CompanyInfoProps {
    companyInfo?: GetCompanyInfoQuery["companyInfo"];
}

const OwnerDetailsWithoutButtons = ({ companyInfo }: CompanyInfoProps) => {
    const date = new Date(companyInfo?.createdAt ?? "");
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="card bg-base-100 shadow-xl h-auto max-h-fit px-10 pt-10 pb-20 mx-20">
            <div>
                {/* TODO: Change this image to an actual company image from database */}
                <div className="mb-4"><Image src="/sampleImg.png" alt="Company Logo" className="rounded-full" height={50} width={50} /></div>
                <div className="text-center">
                    <h2 className="font-bold">{companyInfo?.name}</h2>
                    <p>{companyInfo?.description}</p>
                    <p className="text-info text-sm">Joined on {formattedDate}</p>
                </div>
            </div>
        </div>
    );
}

export default OwnerDetailsWithoutButtons;