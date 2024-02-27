export interface ICupom {
    id: number;
    ativio: number;
    codigo: string;
    created_at: Date;
    descricao: string;
    id_cadastrante: number;
    id_produto: number;
    limite: number;
    listar: number;
    quantidade: number;
    tipo: 'VALOR_TOTAL' | 'PORCENTAGEM',
    updated_at: Date;
    valor: number;
    vigencia_final: string;
    vigencia_inicio: string;
}