export interface ICartao{
  nomeTitular: string;
  numero: number | string;
  dataVencimento: Date | string;
  cvv: number | string;
}