import { type ReactElement } from 'react';
import RootLayout from '@/components/Layout';

const Home = () => {

    return (
        <main className="flex-1 flex flex-col h-full overflow-y-auto">
            Hello
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