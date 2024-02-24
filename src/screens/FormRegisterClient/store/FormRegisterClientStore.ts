import { create } from "zustand"

type SecundarioProps = {
  nome: string
  documento: string
  dataNascimento: string
  email: string
  sexo: string
}

type Product = {
  id?: number;
  nome?: string;
  descricao?: string;
  observacao?: string;
  preco?: number;
  qtd_secundario_padrao?: number;
  add_secundarios?: number;
  tipo?: string
  ativo?: number;
  id_cadastrante?: number;
  created_at?: Date | null;
  update_at?: Date | null;
}

type Props = {
  isLoading: boolean;
  step: number;
  secundarios: SecundarioProps[];
  totalDependets: number;
  product: Product;
  valorPorDependente: number;
  total: number;
  handleNextStep: () => void;
  handleProduct: (product: Product) => void;
  handleSecundarios: (secundario: SecundarioProps) => void;
  handleLoading: () => void;
  setHandleValorPorDependente: (valor: number) => void;
  setValorTotal: (valor: number) => void;
  handleTotalDependete: (valor: number) => void;
}

export const FormRegisterClientStore = create<Props>((set, get) => ({
  isLoading: false,
  step: 0,
  secundarios: [],
  totalDependets: 0,
  product: {},
  valorPorDependente: 0,
  total: 0,
  handleNextStep: () => set((state) => ({ step: state.step + 1 })),
  handleProduct: (product: Product) => set(() => ({ product })),
  handleSecundarios: (secundario: SecundarioProps) => {
    set((state) => ({ secundarios: [...state.secundarios, secundario] }))
  },
  handleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  setHandleValorPorDependente: (valor: number) => set(() => ({valorPorDependente: valor})),
  setValorTotal: (valor: number) => set(() => ({total: valor})),
  handleTotalDependete: (valor: number) => set(() => ({totalDependets: valor}))
}))