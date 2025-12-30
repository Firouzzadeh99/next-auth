

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col mx-auto bg-white">
      <main className="w-full">{children}</main>
    </div>
  );
}
