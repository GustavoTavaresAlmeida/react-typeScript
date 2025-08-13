// src/components/PostsList.tsx - Componente Lista de Posts

import React, { useState, useEffect } from 'react';
import Post from './Post';

interface PostData {
  id: number;
  titulo: string;
  descricao: string;
  capa: string;
  data: string;
  tipo: string;
  criadoEm?: string;
}

interface PostsListProps {
  refreshKey?: number;
}

// Hook simulado para posts
const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Posts iniciais
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

  useEffect(() => {
    const carregarPosts = async () => {
      setIsLoading(true);
      try {
        // Simular carregamento
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Tentar carregar do localStorage
        const saved = localStorage.getItem('posts');
        if (saved) {
          setPosts(JSON.parse(saved));
        } else {
          setPosts(postsIniciais);
          localStorage.setItem('posts', JSON.stringify(postsIniciais));
        }
      } catch (err) {
        setError('Erro ao carregar posts');
        setPosts(postsIniciais);
      } finally {
        setIsLoading(false);
      }
    };

    carregarPosts();
  }, []);

  const deletePost = async (id: number) => {
    try {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    } catch (err) {
      console.error('Erro ao deletar post:', err);
    }
  };

  const contadorPorTipo = posts.reduce((acc, post) => {
    acc[post.tipo] = (acc[post.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    posts,
    contadorPorTipo,
    isLoading,
    error,
    deletePost
  };
};

// Utilitário para formatar tipo
const formatTipoPost = (tipo: string): string => {
  const formatMap: Record<string, string> = {
    'artigo': 'Artigo',
    'noticia': 'Notícia',
    'tutorial': 'Tutorial',
    'entrevista': 'Entrevista'
  };
  return formatMap[tipo] || tipo;
};

const PostsList: React.FC<PostsListProps> = ({ refreshKey }) => {
  const { 
    posts, 
    contadorPorTipo, 
    isLoading, 
    error, 
    deletePost 
  } = usePosts();

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deletePost(id);
    } catch (error) {
      console.error('Erro ao deletar post:', error);
    }
  };

  const totalPosts = posts.length;

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading-container" style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#6b7280' 
        }}>
          <div className="loading-spinner" style={{ 
            width: '40px', 
            height: '40px',
            margin: '0 auto 1rem' 
          }} />
          <p>Carregando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container" style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#ef4444' 
        }}>
          <p>❌ {error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="main-title">Lista de Posts</h1>
      </header>

      {/* Contador de Posts */}
      <section className="contador-container">
        <h2 className="contador-titulo">Resumo dos Posts</h2>
        <p className="contador-texto">
          Atualmente, você tem{' '}
          <span className="posts-count">{totalPosts} posts</span>{' '}
          cadastrados
        </p>

        {totalPosts > 0 && (
          <div className="contador-grid">
            {Object.entries(contadorPorTipo).map(([tipo, quantidade]) => (
              <div key={tipo} className="contador-item">
                <div className="contador-label">
                  {formatTipoPost(tipo)}
                </div>
                <div className="contador-numero">{quantidade}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lista de Posts */}
      <main>
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">Nenhum post encontrado</p>
            <p className="empty-state-subtext">
              Crie seu primeiro post para começar!
            </p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                tipo={post.tipo.toUpperCase()}
                titulo={post.titulo}
                descricao={post.descricao}
                capa={post.capa}
                data={post.data}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PostsList;