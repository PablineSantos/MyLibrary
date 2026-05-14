export interface Recipe {
 id: number; // Não tem existe o tipo Long no ts
 nome: string;
 categoria: string;
 tempoPreparo: number;
 porcoes: number;
 ingredientes: string[];
 modoPreparo: string;
 dataCadastro: Date;
 
}

export const CATEGORIAS = [
 "DOCE",
 "SALGADO",
 "BEBIDA",
 "SOBREMESA"
];

