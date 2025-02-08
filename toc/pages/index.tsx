import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useState, type ReactElement } from 'react';
import { NextPageWithLayout } from "./_app";
import RootLayout from '@/components/Layout';
import type { Item } from '@/types/types';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          item {
            id
            name
            category
            fee
            feeType
            maxDuration
            maxDurationType
            imageURL
          }
        }
      `,
    }),
    next: { revalidate: 10 }
  })
  .then((res) => res.json());

  const items = data?.item;

  // Pass data to the page via props
  return { props: { items: JSON.parse(JSON.stringify(items)) } }
}) satisfies GetServerSideProps<{ items: Item[] }>

const Home: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ items }: { items: Item[] }) => {
  const [categoryName, setCategoryName] = useState("Select ▼");

  // Manually close a dropdown
  function checkAndCloseDropDown(e: React.MouseEvent<HTMLButtonElement>, val: String){
    let targetEl = e.currentTarget;
    if (targetEl && targetEl.matches(':focus')) {
      setCategoryName("" + val);
      setTimeout(function(){
        targetEl.blur();
      }, 0);
    }
  }

  return (
    <main>     
      {/* Search area */}
      <div className="my-10">
        <div className="flex justify-center">
          <h2 className="text-5xl font-semibold tracking-wide">Search Items</h2>
        </div>
        <div className="flex justify-center">
          <p className="mt-8 text-lg font-medium text-pretty">
            Find items you would like to rent for a reasonable price
          </p>
        </div>
        <div className="flex justify-center">
          {/* Dropdown to select an item category */}
          <div className="mt-8 dropdown dropdown-bottom dropdown-center mr-2">
            <button className="btn btn-outline btn-wide btn-circle dropdown-toggle">
              {categoryName}
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full">
              <li><button onClick={(e) => checkAndCloseDropDown(e, "Category ▼")}>Category</button></li>
              <li><button onClick={(e) => checkAndCloseDropDown(e, "Review ▼")}>Review</button></li>
              <li><button onClick={(e) => checkAndCloseDropDown(e, "Posted Date ▼")}>Posted Date</button></li>
            </ul>
          </div>
          <button className="mt-8 py-1 ml-2 btn rounded-full bg-info text-white font-normal">Search <MagnifyingGlassIcon className="h-5 w-5 ml-1 float-right" /></button>
        </div>
      </div>

      {/*
      <div>
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
      */}
    </main>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  );
}
  
export default Home;