import { create } from "zustand"
import { IPermissoes } from "../interfaces/IPermissoes";

type PropsPermissions = {
  assinatura: IPermissoes[];
  cartaoCredito: IPermissoes[];
  hisotricoPagamentos: IPermissoes[];
  dependentes: IPermissoes[];
}

type Props = {
  permissions: PropsPermissions;
  handlePermissions: (permissions: PropsPermissions) => void;
}


export const StorePermissions = create<Props>((set, get) => ({
  permissions: null,
  handlePermissions: (permissions: PropsPermissions) => set(() => ({ permissions }))
}));