import React from 'react';
import SalesRepresentativeBoard from './_components/SalesRepresentativeBoard';
// import { getSession } from '@/shared/lib/auth';
// import { redirect } from 'next/navigation';

const HomePage: React.FC = () => {
  // const session = await getSession();
  const session = 'sales_representative';

  // if (!session) redirect('/login');

  switch (session) {
    case 'sales_representative':
      return <SalesRepresentativeBoard />;
    default:
      return (
        <section id="home" className="grid h-[calc(100vh-150px)] place-items-center">
          <h1 className="text-3xl font-bold">No tenemos una página asignada para tu rol</h1>
        </section>
      );
  }
};

export default HomePage;
