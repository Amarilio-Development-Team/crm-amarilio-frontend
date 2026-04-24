import Navbar from '@/shared/components/Navbar/Navbar';
import SideMenu from '@/shared/components/SideMenu';
// import { getSession } from '@/shared/lib/auth';
// import { redirect } from 'next/navigation';
import DashboardSWRConfig from '@/shared/components/SWRConfig';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const session = await getSession();

  //   if (!session) {
  //     redirect('/administracion/inicio-sesion');
  //   }

  //   const userRole = session?.user?.role;

  return (
    <main id="crm-global" className="relative mx-auto flex max-h-max min-h-[500px] w-full md:max-h-screen md:flex-row">
      <SideMenu userRole={'admin'} />

      <div className="main-container-color relative min-h-screen w-full overflow-y-scroll px-6">
        <Navbar />

        <DashboardSWRConfig>{children}</DashboardSWRConfig>
      </div>
    </main>
  );
}
