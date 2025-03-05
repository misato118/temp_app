import type { Item } from '@/types/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OwnerDetailsWithButtons from './OwnerDetailsWithButtons';

interface ItemsProps {
    item: Item;
}

const ItemDetails = ({ item }: ItemsProps) => {
    const router = useRouter();

    return (
        <div>
            <p className="font-bold text-2xl mb-2">{item.name}</p>
            <p >{item.category}</p>
            <div className="my-4">
                <button
                    className="py-1 btn rounded-full bg-info text-white font-normal"
                    onClick={() => router.push({
                        pathname: "/items/[item]/rental-application-form",
                        query: { item: item.id }
                    })}>
                Apply for Rent</button>
                {/* TODO: Add a page to calculate delivery fees */}
                <button
                    className="py-1 ml-2 btn rounded-full bg-white text-info border border-info font-normal"
                >Estimated Delivery Fee</button>
            </div>
            <p>{item.description}</p>
            <p className="my-2"><span className="font-bold text-xl mb-1">${item.fee}</span> /{item.feeType}</p>
            {/* TODO: Add review here */}
            <div className="collapse collapse-plus mt-4">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Max Duration</div>
                <div className="collapse-content text-sm">{item.maxDuration} {item.maxDurationType}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Deposit Fee</div>
                <div className="collapse-content text-sm">${item.deposit}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Category</div>
                <div className="collapse-content text-sm">{item.category}</div>
            </div>
            <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold pl-0">Owner Details</div>
                <div className="collapse-content text-sm"><OwnerDetailsWithButtons company={item.company} /></div>
            </div>
        </div>
    );
}

export default ItemDetails;