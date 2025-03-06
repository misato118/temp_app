import RootLayout from "@/components/Layout";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

const DeliveryCalc = () => {
    const router = useRouter();
    const { company, homeAddress } = router.query;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setProgress((prev) => (prev < 100 ? prev + 4 : 100));
        }, 100);
    
        return () => clearInterval(interval);
      }, []);

    return (
        <main className="flex justify-center h-screen bg-base-200">
            <div className="rounded-lg overflow-hidden shadow-lg px-20 py-10 bg-white mx-10 text-center h-1/4 mt-10">
                <p className="mb-2"><span className="font-bold text-xl text-info">{company}</span> to <span className="font-bold text-xl text-info">{homeAddress}</span></p>
                {progress < 100 ? (
                        <>
                            <h2 className="font-bold my-4">Calculating the delivery fee...</h2>
                            <progress className="progress progress-secondary w-56 mb-2" value={progress} max="100"></progress>                    
                        </>
                    ) : (
                        <>
                            <h2 className="font-bold my-4">The delivery estimate is</h2>
                            {/* TODO: Use some API to actually calculate here */}
                            <h2 className="font-bold my-4">$23</h2>                        
                        </>
                    )
                }
            </div>
        </main>

    );
}

DeliveryCalc.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
}

export default DeliveryCalc;