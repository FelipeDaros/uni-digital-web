export interface IPolicy {
  id: number;
  descricao: string;
  tipo: string;
  ativa: number;
  id_cadastrante: number;
  created_at: Date;
  updated_at: Date;
}