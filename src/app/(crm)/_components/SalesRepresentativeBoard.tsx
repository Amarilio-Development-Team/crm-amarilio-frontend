import NewProspectButton from '@/features/prospects/components/create-prospect/NewProspectButton';
import RegisterProspectModal from '@/features/prospects/components/create-prospect/RegisterProspectModal';
import React from 'react';

const SalesRepresentativeBoard: React.FC = () => {
  return (
    <section id="home" className="h-max py-6 md:min-h-[calc(100vh-96px)] md:py-0">
      <NewProspectButton />

      <RegisterProspectModal />
    </section>
  );
};

export default SalesRepresentativeBoard;
