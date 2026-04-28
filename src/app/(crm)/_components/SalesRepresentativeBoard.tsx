import NewProspectButton from '@/features/product-prospects/presentation/NewProspectButton';
import RegisterProspectModal from '@/features/product-prospects/presentation/RegisterProspectModal';
import React from 'react';

const SalesRepresentativeBoard: React.FC = () => {
  return (
    <section id="home" className="grid h-[calc(100vh-150px)] place-items-center">
      <NewProspectButton />

      <RegisterProspectModal />
    </section>
  );
};

export default SalesRepresentativeBoard;
