import Header from './Header';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            {children}
        </div>
    );
}