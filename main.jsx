import React, { useState, useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease-in-out',
        animation: 'fadeInSlide 0.3s ease-out'
      }}
    >
      <span>{type === 'success' ? '✅' : '❌'}</span>
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          marginLeft: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}
      >
        ×
      </button>
      <style>
        {`
          @keyframes fadeInSlide {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const App = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [tipoPost, setTipoPost] = useState('');
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar posts ao inicializar (simulando localStorage em memória)
  useEffect(() => {
    // Simular posts salvos no localStorage com alguns exemplos
    const postsSimulados = [
      {
        id: '1',
        titulo: 'Bem-vindo ao Sistema de Posts',
        descricao: 'Este é um exemplo de post criado automaticamente para demonstrar o funcionamento do sistema.',
        urlImagem: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=500&h=300&fit=crop',
        dataPublicacao: new Date().toISOString().split('T')[0],
        tipoPost: 'artigo',
        criadoEm: new Date().toISOString()
      }
    ];
    setPosts(postsSimulados);
    setTotalPosts(postsSimulados.length);
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Função para validar URL
  const validarURL = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Função para validar data
  const validarData = (data) => {
    const hoje = new Date();
    const dataInformada = new Date(data);
    hoje.setHours(0, 0, 0, 0);
    dataInformada.setHours(0, 0, 0, 0);
    return dataInformada >= hoje;
  };

  // Função para validar o formulário
  const validarFormulario = () => {
    if (!titulo.trim()) {
      showToast('O título é obrigatório!', 'error');
      return false;
    }

    if (!descricao.trim()) {
      showToast('A descrição é obrigatória!', 'error');
      return false;
    }

    if (!urlImagem.trim()) {
      showToast('A URL da imagem é obrigatória!', 'error');
      return false;
    }

    if (!validarURL(urlImagem)) {
      showToast('A URL da imagem deve começar com http:// ou https://', 'error');
      return false;
    }

    if (!dataPublicacao) {
      showToast('A data de publicação é obrigatória!', 'error');
      return false;
    }

    if (!validarData(dataPublicacao)) {
      showToast('A data de publicação deve ser hoje ou uma data futura!', 'error');
      return false;
    }

    if (!tipoPost) {
      showToast('O tipo do post é obrigatório!', 'error');
      return false;
    }

    return true;
  };

  // Função para salvar post com loading
  const salvarPost = async () => {
    if (!validarFormulario()) {
      return;
    }

    setIsLoading(true);

    // Simular delay de salvamento
    await new Promise(resolve => setTimeout(resolve, 500));

    const novoPost = {
      id: Date.now().toString(),
      titulo,
      descricao,
      urlImagem,
      dataPublicacao,
      tipoPost,
      criadoEm: new Date().toISOString()
    };

    // Simular salvamento no localStorage usando estado
    const novosPost = [...posts, novoPost];
    setPosts(novosPost);
    setTotalPosts(novosPost.length);

    // Limpar formulário
    setTitulo('');
    setDescricao('');
    setUrlImagem('');
    setDataPublicacao('');
    setTipoPost('');

    setIsLoading(false);
    showToast('Post criado com sucesso!', 'success');
  };

  // Função para deletar post
  const deletarPost = (id) => {
    const postsAtualizados = posts.filter(post => post.id !== id);
    setPosts(postsAtualizados);
    setTotalPosts(postsAtualizados.length);
    showToast('Post removido com sucesso!', 'success');
  };

  // Função para formatar data
  const formatarData = (dataISO) => {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  const styles = {
    appContainer: {
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem 0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    },
    mainWrapper: {
      maxWidth: '80rem',
      margin: '0 auto',
      padding: '0 1rem'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '2rem'
    },
    mainTitle: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'center',
      marginBottom: '0.5rem'
    },
    postsCounter: {
      textAlign: 'center',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    postsCount: {
      fontWeight: '600',
      color: '#2563eb'
    },
    formContainer: {
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      height: 'fit-content'
    },
    formTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '1.5rem'
    },
    formFields: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    fieldLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    fieldInput: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#111827',
      backgroundColor: 'white',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
    },
    fieldTextarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#111827',
      backgroundColor: 'white',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      resize: 'vertical',
      minHeight: '120px'
    },
    fieldSelect: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      color: '#111827',
      backgroundColor: 'white',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      cursor: 'pointer'
    },
    buttonContainer: {
      paddingTop: '1rem'
    },
    submitButton: {
      width: '100%',
      backgroundColor: isLoading ? '#94a3b8' : '#2563eb',
      color: 'white',
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    postsSection: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '1.5rem',
      height: 'fit-content'
    },
    postsList: {
      maxHeight: '500px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    postCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1rem',
      transition: 'box-shadow 0.2s ease-in-out'
    },
    postImage: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '0.375rem',
      marginRight: '1rem'
    },
    postContent: {
      display: 'flex',
      gap: '1rem'
    },
    postInfo: {
      flex: 1
    },
    postTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    postDescription: {
      color: '#6b7280',
      fontSize: '0.875rem',
      marginBottom: '0.5rem',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    postMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.75rem',
      color: '#9ca3af'
    },
    postType: {
      padding: '0.25rem 0.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.5rem',
      cursor: 'pointer',
      fontSize: '0.75rem',
      transition: 'background-color 0.2s ease-in-out'
    }
  };

  const getTipoColor = (tipo) => {
    const colors = {
      artigo: { backgroundColor: '#dbeafe', color: '#1e40af' },
      noticia: { backgroundColor: '#dcfce7', color: '#166534' },
      tutorial: { backgroundColor: '#f3e8ff', color: '#7c3aed' },
      entrevista: { backgroundColor: '#fed7aa', color: '#ea580c' }
    };
    return colors[tipo] || { backgroundColor: '#f3f4f6', color: '#374151' };
  };

  return (
    <div style={styles.appContainer}>
      <div style={{...styles.mainWrapper}} className="main-wrapper">
        <div style={styles.card}>
          <h1 style={styles.mainTitle}>
            Painel de Gerenciamento
          </h1>
          <p style={styles.postsCounter}>
            Atualmente, você tem <span style={styles.postsCount}>{totalPosts} posts</span> cadastrados
          </p>
        </div>

        <div style={styles.contentGrid} className="content-grid">
          {/* Formulário */}
          <div style={{...styles.formContainer}} className="form-container">
            <h2 style={styles.formTitle}>Novo Post</h2>

            <div style={styles.formFields}>
              <div style={styles.fieldGroup}>
                <label htmlFor="titulo" style={styles.fieldLabel}>
                  Título
                </label>
                <input
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título do post"
                  style={styles.fieldInput}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label htmlFor="descricao" style={styles.fieldLabel}>
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição do post"
                  rows={4}
                  style={styles.fieldTextarea}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label htmlFor="urlImagem" style={styles.fieldLabel}>
                  URL da imagem de capa
                </label>
                <input
                  type="url"
                  id="urlImagem"
                  value={urlImagem}
                  onChange={(e) => setUrlImagem(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  style={styles.fieldInput}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label htmlFor="dataPublicacao" style={styles.fieldLabel}>
                  Data de publicação
                </label>
                <input
                  type="date"
                  id="dataPublicacao"
                  value={dataPublicacao}
                  onChange={(e) => setDataPublicacao(e.target.value)}
                  style={styles.fieldInput}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label htmlFor="tipoPost" style={styles.fieldLabel}>
                  Tipo do post
                </label>
                <select
                  id="tipoPost"
                  value={tipoPost}
                  onChange={(e) => setTipoPost(e.target.value)}
                  style={styles.fieldSelect}
                >
                  <option value="">Selecione o tipo do post</option>
                  <option value="artigo">Artigo</option>
                  <option value="noticia">Notícia</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="entrevista">Entrevista</option>
                </select>
              </div>

              <div style={styles.buttonContainer}>
                <button
                  onClick={salvarPost}
                  disabled={isLoading}
                  style={styles.submitButton}
                  onMouseOver={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isLoading && (
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                  )}
                  {isLoading ? 'Criando...' : 'Criar Post'}
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Posts */}
          <div style={{...styles.postsSection}} className="posts-section">
            <h2 style={styles.formTitle}>Posts Recentes</h2>
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                <p>Nenhum post cadastrado ainda.</p>
                <p style={{ fontSize: '0.875rem' }}>Crie seu primeiro post!</p>
              </div>
            ) : (
              <div style={styles.postsList}>
                {posts.slice().reverse().map((post) => (
                  <div 
                    key={post.id} 
                    style={styles.postCard}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={styles.postContent}>
                      <img
                        src={post.urlImagem}
                        alt={post.titulo}
                        style={styles.postImage}
                        onError={(e) => {
                          const target = e.target;
                          target.src = 'https://via.placeholder.com/80x80?text=Imagem';
                        }}
                      />
                      <div style={styles.postInfo}>
                        <h3 style={styles.postTitle}>{post.titulo}</h3>
                        <div style={styles.postMeta}>
                          <span 
                            style={{
                              ...styles.postType,
                              ...getTipoColor(post.tipoPost)
                            }}
                          >
                            {post.tipoPost}
                          </span>
                          <span>{formatarData(post.dataPublicacao)}</span>
                          <button
                            onClick={() => deletarPost(post.id)}
                            style={styles.deleteButton}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc2626';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = '#ef4444';
                            }}
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @media (max-width: 900px) {
            .content-grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          @media (max-width: 480px) {
            .main-wrapper {
              padding: 0 0.5rem !important;
            }
            
            .form-container, .posts-section {
              padding: 1rem !important;
            }
          }
        `}
      </style>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;