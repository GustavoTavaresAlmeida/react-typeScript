import React, { useState, useEffect } from 'react';
import Post from './Post'; // Import do componente Post

// Componente principal PostsList
const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [contadorPorTipo, setContadorPorTipo] = useState({});

  // Inserir posts no localStorage se não existirem
  useEffect(() => {
    const postsExistentes = localStorage.getItem("posts");
    if (!postsExistentes) {
      const postsIniciais = [
        {
          id: 1,
          titulo: "Inteligência Artificial no Dia a Dia",
          descricao: "Como a IA está revolucionando serviços e impactando decisões em empresas e governos.",
          capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
          data: "2025-07-15",
          tipo: "Artigo",
        },
        {
          id: 2,
          titulo: "5 Tendências Tech para 2026",
          descricao: "De computação quântica ao metaverso corporativo, conheça o que vem por aí.",
          capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
          data: "2025-07-10",
          tipo: "Notícia",
        },
        {
          id: 3,
          titulo: "Cibersegurança nas Empresas Brasileiras",
          descricao: "Com o aumento dos ataques digitais, proteger dados virou prioridade.",
          capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
          data: "2025-07-04",
          tipo: "Artigo",
        },
        {
          id: 4,
          titulo: "Desenvolvimento Web: o que mudou em 2025?",
          descricao: "Novas frameworks, ferramentas e metodologias que estão transformando o desenvolvimento.",
          capa: "https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png",
          data: "2025-06-28",
          tipo: "Tutorial",
        }
      ];
      localStorage.setItem("posts", JSON.stringify(postsIniciais));
    }
  }, []);

  // Buscar posts do localStorage
  useEffect(() => {
    const carregarPosts = () => {
      try {
        const postsStorage = localStorage.getItem("posts");
        if (postsStorage) {
          const postsData = JSON.parse(postsStorage);
          setPosts(postsData);
          
          // Calcular contador por tipo
          const contador = postsData.reduce((acc, post) => {
            const tipo = post.tipo;
            acc[tipo] = (acc[tipo] || 0) + 1;
            return acc;
          }, {});
          setContadorPorTipo(contador);
        }
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      }
    };

    carregarPosts();
  }, []);

  // Função para excluir post
  const handleDelete = (id) => {
    try {
      const postsAtualizados = posts.filter(post => post.id !== id);
      setPosts(postsAtualizados);
      localStorage.setItem("posts", JSON.stringify(postsAtualizados));
      
      // Atualizar contador
      const novoContador = postsAtualizados.reduce((acc, post) => {
        const tipo = post.tipo;
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
      }, {});
      setContadorPorTipo(novoContador);
      
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    titulo: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#1f2937',
      marginBottom: '16px'
    },
    contadorContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '32px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    contadorTitulo: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '16px'
    },
    contadorTexto: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '12px'
    },
    totalPosts: {
      fontWeight: '700',
      color: '#2563eb'
    },
    contadorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '12px',
      marginTop: '16px'
    },
    contadorItem: {
      textAlign: 'center',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    },
    contadorLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151'
    },
    contadorNumero: {
      fontSize: '24px',
      fontWeight: '800',
      color: '#2563eb',
      marginTop: '4px'
    },
    postsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      marginTop: '32px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#6b7280'
    },
    emptyStateIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    emptyStateText: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    emptyStateSubtext: {
      fontSize: '14px'
    }
  };

  const totalPosts = posts.length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.titulo}>Painel de Gerenciamento</h1>
      </div>

      {/* Contador de Posts */}
      <div style={styles.contadorContainer}>
        <h2 style={styles.contadorTitulo}>Resumo dos Posts</h2>
        <p style={styles.contadorTexto}>
          Atualmente, você tem <span style={styles.totalPosts}>{totalPosts} posts</span> cadastrados
        </p>
        
        {totalPosts > 0 && (
          <div style={styles.contadorGrid}>
            {Object.entries(contadorPorTipo).map(([tipo, quantidade]) => (
              <div key={tipo} style={styles.contadorItem}>
                <div style={styles.contadorLabel}>{tipo}</div>
                <div style={styles.contadorNumero}>{quantidade}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lista de Posts */}
      {posts.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyStateIcon}>📝</div>
          <p style={styles.emptyStateText}>Nenhum post encontrado</p>
          <p style={styles.emptyStateSubtext}>Crie seu primeiro post para começar!</p>
        </div>
      ) : (
        <div style={styles.postsGrid}>
          {posts.map((post) => (
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

      <style>
        {`
          @media (max-width: 768px) {
            .posts-grid {
              grid-template-columns: 1fr !important;
            }
            .contador-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          
          @media (max-width: 480px) {
            .container {
              padding: 20px 10px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PostsList;