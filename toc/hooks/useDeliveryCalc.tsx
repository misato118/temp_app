import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useDeliveryCalc = () => {
    const router = useRouter();
    const { company, homeAddress } = router.query;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 4 : 100));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return {
        progress,
        company,
        homeAddress
    }
}

export default useDeliveryCalc;