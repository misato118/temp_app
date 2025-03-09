import Header from './Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      {children}
    </div>
  );

}