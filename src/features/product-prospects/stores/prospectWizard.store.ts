import { create } from 'zustand';
import type { Prospect } from '../domain/product-prospects.types';

interface ProspectWizardState {
  currentStep: number;
  clientData: string | null;
  prospectData: Prospect | null;

  setClientData: (data: string) => void;
  setProspectData: (data: Prospect) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
}

export const useProspectWizardStore = create<ProspectWizardState>(set => ({
  currentStep: 1,
  clientData: null,
  prospectData: null,

  setClientData: data => set({ clientData: data }),
  setProspectData: data => set({ prospectData: data }),

  nextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set(state => ({ currentStep: state.currentStep - 1 })),

  resetWizard: () => set({ currentStep: 1, clientData: null, prospectData: null }),
}));
