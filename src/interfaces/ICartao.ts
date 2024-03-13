export interface ICartao{
  nomeTitular: string;
  numero: number | string;
  vencimento: Date | string;
  cvc: number | string;
}