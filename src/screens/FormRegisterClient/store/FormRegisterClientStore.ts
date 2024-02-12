import { create } from "zustand"

type DependentesProps = {
  nome: string
  documento: string
  data_nascimento: string
  email: string
  sexo: string
}

type PropsSignature = {
  id?: number | null
  title?: string
  price?: number
  dependents?: number
  total?: number
  couponId?: number | null
  discount?: number
}

type Props = {
  step: number
  isLoading: boolean
  signature: PropsSignature
  dependentes: DependentesProps[]
  typePayment: string
  acceptTerms: boolean
  handleAcceptTerms: () => void
  handleChangePayment: (payment: string) => void
  handleAddDependente: (data: DependentesProps) => void
  handleRemoveDependente: (documento: string) => void
  setIsLoading: () => void
  handleNextStep: () => void
  handleBackStep: () => void
  handleAddDependents: () => void
  handleRemoveDependents: () => void
  handleSelectedSignature: (data: PropsSignature) => void
}

export const FormRegisterClientStore = create<Props>((set) => ({
  typePayment: "pix",
  step: 0,
  isLoading: false,
  signature: {
    id: null,
    total: 0,
    couponId: null,
    discount: 0,
    dependents: 0,
    price: 0,
    title: "",
  },
  dependentes: [],
  acceptTerms: false,
  handleAcceptTerms: () => {
    set((state) => ({ acceptTerms: !state.acceptTerms }))
  },
  handleChangePayment: (type: string) => {
    set({ typePayment: type })
  },
  handleAddDependente: (dependente: DependentesProps) => {
    set((state) => ({ dependentes: [...state.dependentes, dependente] }))
  },
  handleRemoveDependente: (documento: string) => {
    set((state) => ({
      dependentes: state.dependentes.filter(
        (item) => item.documento !== documento,
      ),
    }))
  },
  setIsLoading: () => {
    set((state) => ({ isLoading: !state.isLoading }))
  },
  handleNextStep: () => {
    set((state) => ({ step: state.step + 1 }))
  },
  handleBackStep: () => {
    set((state) => ({ step: state.step - 1 }))
  },
  handleAddDependents: () => {
    //@ts-ignore
    set((state) => ({
      signature: {
        ...state.signature,
        dependents: state.signature.dependents + 1,
      },
    }))
  },
  handleRemoveDependents: () => {
    //@ts-ignore
    set((state) => ({
      signature: {
        ...state.signature,
        dependents: state.signature.dependents - 1,
      },
    }))
  },
  handleSelectedSignature: (data: PropsSignature) => {
    set((state) => ({
      signature: {
        ...state.signature,
        id: data.id,
        price: data.price,
        title: data.title,
        total: data.total,
      },
    }))
  },
}))
