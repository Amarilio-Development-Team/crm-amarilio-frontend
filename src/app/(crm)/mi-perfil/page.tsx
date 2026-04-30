import GeneralInfoTab from '@/features/user-profile/components/tabs/GeneralInfoTab';
import React from 'react';
// import { getSession } from '@/shared/lib/auth';
// import { redirect } from 'next/navigation';

const MyProfilePage: React.FC = () => {
  // const session = await getSession();
  const session = 'sales_representative';

  // if (!session) redirect('/login');

  return (
    <section id="my-profile" className="mx-auto mt-8 flex h-[calc(100vh-150px)] w-full max-w-[500px] flex-col gap-8 md:min-w-full">
      <h1 className="text-3xl font-bold">Mi Perfil</h1>

      <GeneralInfoTab />
    </section>
  );
};

export default MyProfilePage;
