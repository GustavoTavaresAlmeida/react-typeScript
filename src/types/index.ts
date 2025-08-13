// src/types/index.ts - Definições de Tipos TypeScript

import { ReactNode } from 'react';

export interface PostData {
  id: number;
  titulo: string;
  descricao: string;
  capa: string;
  data: string;
  tipo: TipoPost;
  criadoEm?: string;
}

export interface PostFormData {
  titulo: string;
  descricao: string;
  urlImagem: string;
  dataPublicacao: string;
  tipoPost: TipoPost | '';
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

export type TipoPost = 'artigo' | 'noticia' | 'tutorial' | 'entrevista';

export interface TipoColor {
  backgroundColor: string;
  color: string;
}

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastState {
  message: string;
  type: ToastType;
}

export interface PostFormProps {
  onPostCreated?: () => void;
  showToast: (message: string, type: ToastType) => void;
}

export interface PostsListProps {
  refreshKey?: number;
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface PostsContextType {
  posts: PostData[];
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>;
  addPost: (post: PostData) => void;
  deletePost: (id: number) => void;
  getPostById: (id: number) => PostData | undefined;
}

// Tipos para componentes estilizados
export interface StyledComponentProps {
  className?: string;
  children?: ReactNode;
}

// Tipos para eventos
export interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {}
export interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
export interface TextareaChangeEvent extends React.ChangeEvent<HTMLTextAreaElement> {}
export interface SelectChangeEvent extends React.ChangeEvent<HTMLSelectElement> {}

// Tipos para LocalStorage
export interface LocalStorageData {
  posts: PostData[];
  lastUpdated: string;
}

// Constantes tipadas
export const TIPO_POST_OPTIONS: { value: TipoPost; label: string }[] = [
  { value: 'artigo', label: 'Artigo' },
  { value: 'noticia', label: 'Notícia' },
  { value: 'tutorial', label: 'Tutorial' },
  { value: 'entrevista', label: 'Entrevista' },
];

export const TOAST_DURATION = 3000;

export const VALIDATION_MESSAGES = {
  TITULO_OBRIGATORIO: 'O título é obrigatório!',
  DESCRICAO_OBRIGATORIA: 'A descrição é obrigatória!',
  URL_OBRIGATORIA: 'A URL da imagem é obrigatória!',
  URL_INVALIDA: 'A URL da imagem deve começar com http:// ou https://',
  DATA_OBRIGATORIA: 'A data de publicação é obrigatória!',
  DATA_INVALIDA: 'A data de publicação deve ser hoje ou uma data futura!',
  TIPO_OBRIGATORIO: 'O tipo do post é obrigatório!',
} as const;