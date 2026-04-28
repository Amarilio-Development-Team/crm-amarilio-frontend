'use client';

import React from 'react';
import { useProspectWizardStore } from '../stores/prospectWizard.store';
import { Step1ClientSelection } from './create-prospect-steps/StepOne';
import { Icon } from '@iconify/react';

const RegisterProspectModal: React.FC = () => {
  const { currentStep, resetWizard } = useProspectWizardStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ClientSelection />;
      case 2:
        return (
          <div className="p-8 text-center">
            <h4 className="text-lg font-semibold">Step 2</h4>
          </div>
        );

      default:
        return <Step1ClientSelection />;
    }
  };

  return (
    <dialog id="create-prospect-modal" className="modal">
      <div className="modal-box w-11/12 max-w-2xl">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2" onClick={resetWizard}>
            <Icon icon="material-symbols:close" className="text-lg lg:text-xl" />
          </button>
        </form>

        {renderCurrentStep()}
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={resetWizard}>close</button>
      </form>
    </dialog>
  );
};

export default RegisterProspectModal;
