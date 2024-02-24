export interface IAssinatura {
  id: number;
  data_inicio: string;
  data_final: string;
  data_vencimento: string;
  ativa: number;
  qtd_secundario: number;
  total: string;
  id_usuario: number;
  id_produto: number;
  id_cumpom: number;
  id_pagamento: number;
}
