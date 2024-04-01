export interface IPermissoes{
  id: number;
  tipo: "VISUALIZAR" | "EDITAR" | "CRIAR" | "DELETAR";
  tela: string;
  created_at: Date;
  updated_at: Date;
}