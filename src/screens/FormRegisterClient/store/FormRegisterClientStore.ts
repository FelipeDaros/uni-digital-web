import { create } from 'zustand';

type Props = {
  isLoading: boolean;
  signature: PropsSignature | null;
  formulario: PropsFormRegisterClient | null;
  dependentes: DependetesProps[];
  handleAddDependente: (data: DependetesProps) => void;
  handleRemoveDependente: (documento: string) => void;
  setIsLoading: () => void;
  updateFormulario: (field: string, value: string) => void;
}

type DependetesProps = {
  nome: string;
  documento: string;
  dataNascimento: Date;
  email: string;
  sexo: string;
}

type PropsSignature = {
  id: number;
  title: string;
  price: number;
  dependents: number;
  total: number;
  couponId: number;
  discoount: number;
}

export type PropsFormRegisterClient = {
  nome?: string;
  senha?: string;
  confirmarSenha?: string;
  dataNascimento?: Date;
  documento?: string;
  sexo?: string;
  fone?: string;
  celular?: string;
  email?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
}

type BankData = {
  titularName: string;
  numberCart: number;
  mouth: number;
  year: number;
  cvc: number;
}

export const FormRegisterClientStore = create<Props>((set, get) => ({
  isLoading: false,
  signature: null,
  formulario: null,
  dependentes: [],
  handleAddDependente: (dependente: DependetesProps) => set((state) => ({ dependentes: [...state.dependentes, dependente] })),
  handleRemoveDependente: (documento: string) => set((state) => ({ dependentes: state.dependentes.filter(item => item.documento !== documento) })),
  setIsLoading: () => { set({ isLoading: !get().isLoading }) },
  updateFormulario: (field: string, value: string) => set((state) => ({
    formulario: {
      ...state.formulario,
      [field]: value,
    },
  })),
}));
