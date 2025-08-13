// src/utils/index.ts - Funções Utilitárias

import { PostData, TipoPost, ValidationResult, VALIDATION_MESSAGES } from '@/types';

/**
 * Valida se uma URL é válida
 */
export const validarURL = (url: string): boolean => {
  return url.startsWith('http://') || url.startsWith('https://');
};

/**
 * Valida se uma data é hoje ou futura
 */
export const validarData = (data: string): boolean => {
  const hoje = new Date();
  const dataInformada = new Date(data);
  hoje.setHours(0, 0, 0, 0);
  dataInformada.setHours(0, 0, 0, 0);
  return dataInformada >= hoje;
};

/**
 * Formata data para exibição em português brasileiro
 */
export const formatarData = (dataString: string): string => {
  return new Date(dataString).toLocaleDateString('pt-BR');
};

/**
 * Gera um ID único baseado no timestamp
 */
export const gerarId = (): number => {
  return Date.now();
};

/**
 * Valida um campo de título
 */
export const validarTitulo = (titulo: string): ValidationResult => {
  if (!titulo.trim()) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.TITULO_OBRIGATORIO
    };
  }
  return { isValid: true };
};

/**
 * Valida um campo de descrição
 */
export const validarDescricao = (descricao: string): ValidationResult => {
  if (!descricao.trim()) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.DESCRICAO_OBRIGATORIA
    };
  }
  return { isValid: true };
};

/**
 * Valida URL da imagem
 */
export const validarUrlImagem = (url: string): ValidationResult => {
  if (!url.trim()) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.URL_OBRIGATORIA
    };
  }
  
  if (!validarURL(url)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.URL_INVALIDA
    };
  }
  
  return { isValid: true };
};

/**
 * Valida data de publicação
 */
export const validarDataPublicacao = (data: string): ValidationResult => {
  if (!data) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.DATA_OBRIGATORIA
    };
  }
  
  if (!validarData(data)) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.DATA_INVALIDA
    };
  }
  
  return { isValid: true };
};

/**
 * Valida tipo do post
 */
export const validarTipoPost = (tipo: string): ValidationResult => {
  if (!tipo) {
    return {
      isValid: false,
      message: VALIDATION_MESSAGES.TIPO_OBRIGATORIO
    };
  }
  return { isValid: true };
};

/**
 * Retorna a classe CSS para o tipo de post
 */
export const getTipoClass = (tipo: string): string => {
  const classes: Record<string, string> = {
    'ARTIGO': 'tipo-artigo',
    'NOTÍCIA': 'tipo-noticia',
    'TUTORIAL': 'tipo-tutorial',
    'ENTREVISTA': 'tipo-entrevista'
  };
  return classes[tipo.toUpperCase()] || 'tipo-artigo';
};

/**
 * Retorna as cores para o tipo de post
 */
export const getTipoColor = (tipo: string): { backgroundColor: string; color: string } => {
  const colors: Record<string, { backgroundColor: string; color: string }> = {
    'ARTIGO': { backgroundColor: '#dbeafe', color: '#1e40af' },
    'NOTÍCIA': { backgroundColor: '#dcfce7', color: '#166534' },
    'TUTORIAL': { backgroundColor: '#f3e8ff', color: '#7c3aed' },
    'ENTREVISTA': { backgroundColor: '#fed7aa', color: '#ea580c' }
  };
  return colors[tipo.toUpperCase()] || { backgroundColor: '#f3f4f6', color: '#374151' };
};

/**
 * Gerencia localStorage de posts
 */
export const postsStorage = {
  save: (posts: PostData[]): void => {
    try {
      localStorage.setItem('posts', JSON.stringify(posts));
    } catch (error) {
      console.error('Erro ao salvar posts no localStorage:', error);
    }
  },

  load: (): PostData[] => {
    try {
      const posts = localStorage.getItem('posts');
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('Erro ao carregar posts do localStorage:', error);
      return [];
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem('posts');
    } catch (error) {
      console.error('Erro ao limpar posts do localStorage:', error);
    }
  }
};

/**
 * Calcula contador por tipo de post
 */
export const calcularContadorPorTipo = (posts: PostData[]): Record<string, number> => {
  return posts.reduce((acc, post) => {
    const tipo = post.tipo;
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

/**
 * Debounce para otimizar performance
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Trunca texto com reticências
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Sanitiza string para exibição segura
 */
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/<[^>]*>/g, '');
};

/**
 * Obtém data mínima (hoje) para input date
 */
export const getMinDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Verifica se uma string está vazia ou só tem espaços
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Converte tipo do post para display
 */
export const formatTipoPost = (tipo: TipoPost): string => {
  const formatMap: Record<TipoPost, string> = {
    'artigo': 'Artigo',
    'noticia': 'Notícia',
    'tutorial': 'Tutorial',
    'entrevista': 'Entrevista'
  };
  return formatMap[tipo] || tipo;
};