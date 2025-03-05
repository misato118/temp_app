import { Company } from "@/types/types";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

interface CompanyProps {
    company: Company;
}

const OwnerDetailsWithButtons = ({ company }: CompanyProps) => {
    return (
        <div>
            <div className="flex items-center">
                {/* TODO: Add a company image here instead (e.g., {company.logoURL}) */}
                <img
                    alt="Owner Image"
                    src="/sampleImg.png"
                    className="h-12 w-12 rounded-full mr-4" />
                <p>{company.name}</p>
            </div>
            <p className="my-3">{company.description}</p>
            <div className="flex">
                <button
                    className="flex py-1 btn rounded-full bg-info text-white font-normal justify-center mr-2"
                ><ChatBubbleLeftEllipsisIcon className="w-5 h-5" /> Ask Questions</button>
                <button className="py-1 btn rounded-full bg-secondary text-white font-normal px-4">More</button>
            </div>
        </div>
    );
}

export default OwnerDetailsWithButtons;