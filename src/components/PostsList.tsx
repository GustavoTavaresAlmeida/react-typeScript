// src/components/PostsList.tsx - Componente Lista de Posts TypeScript

import React from 'react';
import { PostsListProps } from '@/types';
import { usePosts } from '@/hooks/usePosts';
import { formatTipoPost } from '@/utils';
import Post from './Post';

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
                  {formatTipoPost(tipo as any)}
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