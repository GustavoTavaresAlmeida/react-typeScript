// src/components/Post.tsx - Componente Individual do Post

import React from 'react';
import { PostProps } from '@/types';
import { formatarData, getTipoClass } from '@/utils';

const Post: React.FC<PostProps> = ({ 
  id, 
  tipo, 
  titulo, 
  descricao, 
  capa, 
  data, 
  handleDelete 
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/400x180/f3f4f6/9ca3af?text=Imagem+não+encontrada';
  };

  const handleDeleteClick = (): void => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      handleDelete(id);
    }
  };

  return (
    <article className="post-card">
      <div className="post-image-container">
        <img
          src={capa}
          alt={titulo}
          className="post-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <div className="post-content">
        <span className={`tipo-tag ${getTipoClass(tipo)}`}>
          {tipo}
        </span>
        
        <h3 className="post-title">
          {titulo}
        </h3>
        
        <p className="post-description">
          {descricao}
        </p>
        
        <footer className="post-footer">
          <time className="data-publicacao" dateTime={data}>
            Publicado em: {formatarData(data)}
          </time>
          
          <button
            className="btn btn-danger"
            onClick={handleDeleteClick}
            type="button"
            aria-label={`Excluir post: ${titulo}`}
          >
            Excluir
          </button>
        </footer>
      </div>
    </article>
  );
};

export default Post;