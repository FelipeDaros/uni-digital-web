export interface IProduct {
    id: number;
    nome: string;
    descricao: string;
    observacao: string;
    preco: number;
    qtd_secundario_padrao: number;
    add_secundarios: number;
    tipo: string
    ativo: number;
    id_cadastrante: number;
    created_at: Date | null;
    update_at: Date | null;
}