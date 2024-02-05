import { create } from 'zustand';

type DependentesProps = {
  nome: string;
  documento: string;
  dataNascimento: string;
  email: string;
  sexo: string;
}

type PropsSignature = {
  title?: string;
  price?: number;
  dependents?: number;
  total?: number;
  couponId?: number | null;
  discount?: number;
}

type Props = {
  step: number;
  isLoading: boolean;
  signature: PropsSignature | any;
  dependentes: DependentesProps[];
  typePayment: string;
  acceptTerms: boolean;
  handleAcceptTerms: () => void;
  handleChangePayment: (payment: string) => void;
  handleAddDependente: (data: DependentesProps) => void;
  handleRemoveDependente: (documento: string) => void;
  setIsLoading: () => void;
  handleNextStep: () => void;
  handleBackStep: () => void;
  handleAddDependents: () => void;
  handleRemoveDependents: () => void;
}

export const FormRegisterClientStore = create<Props>((set) => ({
  typePayment: 'pix',
  step: 0,
  isLoading: false,
  signature: {
    total: 0,
    couponId: null,
    discount: 0,
    dependents: 0,
    price: 0,
    title: ''
  },
  dependentes: [],
  acceptTerms: false,
  handleAcceptTerms: () => {
    set((state) => ({ acceptTerms: !state.acceptTerms }));
  },
  handleChangePayment: (type: string) => {
    set({ typePayment: type });
  },
  handleAddDependente: (dependente: DependentesProps) => {
    set((state) => ({ dependentes: [...state.dependentes, dependente] }));
  },
  handleRemoveDependente: (documento: string) => {
    set((state) => ({ dependentes: state.dependentes.filter(item => item.documento !== documento) }));
  },
  setIsLoading: () => {
    set((state) => ({ isLoading: !state.isLoading }));
  },
  handleNextStep: () => {
    set((state) => ({ step: state.step + 1 }));
  },
  handleBackStep: () => {
    set((state) => ({ step: state.step - 1 }));
  },
  handleAddDependents: () => {
    set((state) => ({ signature: { ...state.signature, dependents: state.signature.dependents + 1 } }));
  },
  handleRemoveDependents: () => {
    set((state) => ({ signature: { ...state.signature, dependents: state.signature.dependents - 1 } }));
  },
}));
