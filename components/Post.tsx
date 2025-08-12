import React from 'react';

// Interface para as props do componente Post
interface PostProps {
  id: number;
  tipo: string;
  titulo: string;
  descricao: string;
  capa: string;
  data: string;
  handleDelete: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ id, tipo, titulo, descricao, capa, data, handleDelete }) => {
  const formatarData = (dataString: string): string => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const getTipoColor = (tipo: string): { backgroundColor: string; color: string } => {
    const colors = {
      'ARTIGO': { backgroundColor: '#dbeafe', color: '#1e40af' },
      'NOTÍCIA': { backgroundColor: '#dcfce7', color: '#166534' },
      'TUTORIAL': { backgroundColor: '#f3e8ff', color: '#7c3aed' },
      'ENTREVISTA': { backgroundColor: '#fed7aa', color: '#ea580c' }
    };
    return colors[tipo.toUpperCase() as keyof typeof colors] || { backgroundColor: '#f3f4f6', color: '#374151' };
  };

  const styles = {
    postCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      border: '1px solid #e5e7eb'
    } as React.CSSProperties,
    postImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover' as const,
      backgroundColor: '#f3f4f6'
    },
    postContent: {
      padding: '20px'
    },
    tipoTag: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      marginBottom: '12px',
      ...getTipoColor(tipo)
    },
    titulo: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '12px',
      lineHeight: '1.3'
    },
    descricao: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.5',
      marginBottom: '16px'
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dataPublicacao: {
      fontSize: '13px',
      color: '#9ca3af',
      fontWeight: '500'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 12px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    }
  };

  return (
    <div 
      style={styles.postCard}
      onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <img
        src={capa}
        alt={titulo}
        style={styles.postImage}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/400x180/f3f4f6/9ca3af?text=Imagem+não+encontrada';
        }}
      />
      <div style={styles.postContent}>
        <span style={styles.tipoTag}>{tipo}</span>
        <h3 style={styles.titulo}>{titulo}</h3>
        <p style={styles.descricao}>{descricao}</p>
        <div style={styles.postFooter}>
          <span style={styles.dataPublicacao}>
            Publicado em: {formatarData(data)}
          </span>
          <button
            onClick={() => handleDelete(id)}
            style={styles.deleteButton}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;