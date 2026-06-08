import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:grid grid-cols-12 gap-8 min-h-screen max-w-7xl sm:px-4 lg:px-6 mt-20">
      <aside className="col-span-2 h-full sticky top-0">
        <Sidebar />
      </aside>

      <main className="col-span-10 h-full">
        {children}
      </main>
    </div>
  );
}