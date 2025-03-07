import { Company } from "@/types/types";

const OwnerDetailsWithoutButtons = ({ company }: { company: Company }) => {
    const date = new Date(company.createdAt.toString());
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="card bg-base-100 shadow-xl h-auto max-h-fit px-10 pt-10 pb-20 mx-20">
            <div>
                {/* TODO: Change this image to an actual company image from database */}
                <div className="mb-4"><img src="/sampleImg.png" alt="Company Logo" className="rounded-full" /></div>
                <div className="text-center">
                    <h2 className="font-bold">{company.name}</h2>
                    <p>{company.description}</p>
                    <p className="text-info text-sm">Joined on {formattedDate}</p>
                </div>
            </div>
        </div>
    );
}

export default OwnerDetailsWithoutButtons;