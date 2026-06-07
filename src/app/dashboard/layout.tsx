import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:grid grid-cols-12 gap-8 min-h-screen max-w-7xl sm:px-4 lg:px-6 mt-20">
      <aside className="col-span-3 h-full ">
        <Sidebar />
      </aside>

      <main className="col-span-9 h-full">
        {children}
      </main>
    </div>
  );
}