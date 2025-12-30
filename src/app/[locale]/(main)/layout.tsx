export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full">{children}</main>;
}
