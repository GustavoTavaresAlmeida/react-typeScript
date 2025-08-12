// types.ts - Interfaces e tipos compartilhados

export interface PostData {
  id: number;
  titulo: string;
  descricao: string;
  capa: string;
  data: string;
  tipo: string;
}

export interface PostProps {
  id: number;
  tipo: string;
  titulo: string;
  descricao: string;
  capa: string;
  data: string;
  handleDelete: (id: number) => void;
}

export interface ContadorPorTipo {
  [key: string]: number;
}

export type TipoPost = 'Artigo' | 'Notícia' | 'Tutorial' | 'Entrevista';

export interface TipoColor {
  backgroundColor: string;
  color: string;
}