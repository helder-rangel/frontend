export interface ProductModelServer{
    id: number;
    nome: string;
    codigo_ean13: string;
    peso: number;
    comprimento: number;
    altura: number;
    imagem: string;
    descricao:string;
    descricao_curta:string;
    preco: number;
    fabricante:string;
    categoria:string;
    quant:number

}

export interface ServerResponse {
    count:Number;
    products: ProductModelServer[];
}