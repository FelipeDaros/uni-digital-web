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
  title?: string;
  description?: string;
  price?: number;
}

type Props = {
  isLoading: boolean;
  step: number;
  secundarios: SecundarioProps[];
  totalDependets: number;
  product: Product;
  handleNextStep: () => void;
  handleNumberDependents: (quantity: number) => void;
  handleProduct: (product: Product) => void;
  handleSecundarios: (secundario: SecundarioProps) => void;
  handleAddDependents: () => void
  handleRemoveDependents: () => void
  handleLoading: () => void;
}

export const FormRegisterClientStore = create<Props>((set, get) => ({
  isLoading: false,
  step: 0,
  secundarios: [],
  totalDependets: 0,
  product: {},
  handleNextStep: () => set((state) => ({ step: state.step + 1 })),
  handleNumberDependents: (quantity: number) => set(() => ({ totalDependets: quantity })),
  handleProduct: (product: Product) => set(() => ({ product })),
  handleSecundarios: (secundario: SecundarioProps) => {
    set((state) => ({ secundarios: [...state.secundarios, secundario] }))
  },
  handleAddDependents: () => set((state) => ({ totalDependets: state.totalDependets + 1 })),
  handleRemoveDependents: () => set((state) => ({ totalDependets: state.totalDependets <= 0 ? 0 : - 1 })),
  handleLoading: () => set((state) => ({ isLoading: !state.isLoading }))
}))