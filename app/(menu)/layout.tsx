import { BottomNavbar } from "@/components/bottom-navbar";

export default async function MenuLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="flex flex-col min-h-screen ">
      {children}
      <BottomNavbar />
    </section>
  );
}
