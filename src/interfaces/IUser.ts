export interface IUser {
  id: number;
  name: string;
  defaulterSignature: boolean;
  bairro: string;
  celular: string;
  cep: string;
  cidade: string;
  data_nascimento: Date;
  documento: string;
  email: string;
  endereco: string;
  fone: string;
  foto: string;
  nome: string;
  numero: string;
  recuperar_até: any;
  sexo: string;
  tipo: "T" | "A" | "S";
  uf: string;
  created_at: Date;
  updated_at: Date;
  ativo: number;
}
