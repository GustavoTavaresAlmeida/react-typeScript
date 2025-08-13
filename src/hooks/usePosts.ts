// src/hooks/usePosts.ts - Hook Customizado para Gerenciar Posts

import { useState, useCallback, useEffect } from 'react';
import { PostData, ContadorPorTipo } from '@/types';
import { calcularContadorPorTipo } from '@/utils';

interface UsePostsReturn {
  posts: PostData[];
  contadorPorTipo: ContadorPorTipo;
  isLoading: boolean;
  error: string | null;
  addPost: (post: PostData) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  refreshPosts: () => Promise<void>;
  getPostById: (id: number) => PostData | undefined;
}

// Simulação de localStorage que funciona mesmo sem browser storage
const mockStorage = {
  data: null as PostData[] | null,
  
  save: (posts: PostData[]): void => {
    mockStorage.data = posts;
    // Tentar usar localStorage se disponível
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('posts', JSON.stringify(posts));
      }
    } catch (error) {
      console.warn('localStorage não disponível, usando storage em memória');
    }
  },

  load: (): PostData[] => {
    // Primeiro tentar localStorage
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('posts');
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (error) {
      console.warn('Erro ao acessar localStorage, usando storage em memória');
    }
    
    // Fallback para storage em memória
    return mockStorage.data || [];
  }
};

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [contadorPorTipo, setContadorPorTipo] = useState<ContadorPorTipo>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Posts iniciais para demonstração
  const postsIniciais: PostData[] = [
    {
      id: 1,
      titulo: "Inteligência Artificial no Dia a Dia",
      descricao: "Como a IA está revolucionando serviços e impactando decisões em empresas e governos.",
      capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
      data: "2025-07-15",
      tipo: "artigo",
      criadoEm: new Date().toISOString()
    },
    {
      id: 2,
      titulo: "5 Tendências Tech para 2026",
      descricao: "De computação quântica ao metaverso corporativo, conheça o que vem por aí.",
      capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
      data: "2025-07-10",
      tipo: "noticia",
      criadoEm: new Date().toISOString()
    },
    {
      id: 3,
      titulo: "Cibersegurança nas Empresas Brasileiras",
      descricao: "Com o aumento dos ataques digitais, proteger dados virou prioridade.",
      capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
      data: "2025-07-04",
      tipo: "artigo",
      criadoEm: new Date().toISOString()
    },
    {
      id: 4,
      titulo: "Desenvolvimento Web: o que mudou em 2025?",
      descricao: "Novas frameworks, ferramentas e metodologias que estão transformando o desenvolvimento.",
      capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
      data: "2025-06-28",
      tipo: "tutorial",
      criadoEm: new Date().toISOString()
    }
  ];

  // Atualizar contador quando posts mudarem
  const atualizarContador = useCallback((postsList: PostData[]) => {
    const contador = calcularContadorPorTipo(postsList);
    setContadorPorTipo(contador);
  }, []);

  // Carregar posts
  const carregarPosts = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      let postsCarregados = mockStorage.load();
      
      // Se não há posts, usar os iniciais
      if (postsCarregados.length === 0) {
        postsCarregados = postsIniciais;
        mockStorage.save(postsCarregados);
      }

      setPosts(postsCarregados);
      atualizarContador(postsCarregados);
    } catch (err) {
      setError('Erro ao carregar posts');
      console.error('Erro ao carregar posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [atualizarContador]);

  // Adicionar novo post
  const addPost = useCallback(async (novoPost: PostData): Promise<void> => {
    try {
      const postsAtualizados = [...posts, novoPost];
      setPosts(postsAtualizados);
      mockStorage.save(postsAtualizados);
      atualizarContador(postsAtualizados);
    } catch (err) {
      setError('Erro ao adicionar post');
      console.error('Erro ao adicionar post:', err);
      throw err;
    }
  }, [posts, atualizarContador]);

  // Deletar post
  const deletePost = useCallback(async (id: number): Promise<void> => {
    try {
      const postsAtualizados = posts.filter((post: { id: number; }) => post.id !== id);
      setPosts(postsAtualizados);
      mockStorage.save(postsAtualizados);
      atualizarContador(postsAtualizados);
    } catch (err) {
      setError('Erro ao deletar post');
      console.error('Erro ao deletar post:', err);
      throw err;
    }
  }, [posts, atualizarContador]);

  // Atualizar posts
  const refreshPosts = useCallback(async (): Promise<void> => {
    await carregarPosts();
  }, [carregarPosts]);

  // Buscar post por ID
  const getPostById = useCallback((id: number): PostData | undefined => {
    return posts.find((post: { id: number; }) => post.id === id);
  }, [posts]);

  // Carregar posts na inicialização
  useEffect(() => {
    carregarPosts();
  }, [carregarPosts]);

  return {
    posts,
    contadorPorTipo,
    isLoading,
    error,
    addPost,
    deletePost,
    refreshPosts,
    getPostById
  };
};