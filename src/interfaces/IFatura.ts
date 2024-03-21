export interface IFatura{
  id: number;
  nome_titular: string;
  numero: number | string;
  data_vencimento: string;
  cvc: number | string;
  ativo: number;
  id_dono: number;
  created_at: Date;
  updated_at: Date;
}