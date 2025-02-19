import Item from "@/pages/items/[item]";
import Link from 'next/link';

interface ItemsProps {
    items: Item[];
}

const Items = ({ items }: ItemsProps) => {
    return (
      <div className="h-full">
        {items.map((item) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src="" alt="Image here"></img>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <Link legacyBehavior
                    href={{
                    pathname: '/items/[item]',
                    query: { item: item.id },
                  }}>
                    <a>{item.id}</a>
                  </Link>
                </div>
                <p className="text-gray-700 text-base">{item.name}</p>
                <p className="text-gray-700 text-base">{item.imageURL}</p>
                <p className="text-gray-700 text-base">{item.fee} {item.feeType}</p>
                <p className="text-gray-700 text-base">{item.maxDuration} {item.maxDurationType}</p>
              </div>
          </div>
        ))}
      </div>
    );
}

export default Items;