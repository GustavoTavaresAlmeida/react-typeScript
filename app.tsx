import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

interface Post {
  id: string;
  titulo: string;
  descricao: string;
  urlImagem: string;
  dataPublicacao: string;
  tipoPost: string;
  criadoEm: string;
}

const App: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [tipoPost, setTipoPost] = useState('');
  const [totalPosts, setTotalPosts] = useState(0);

  // Carregar posts do localStorage ao inicializar
  useEffect(() => {
    const postsArmazenados = localStorage.getItem('posts');
    if (postsArmazenados) {
      const posts = JSON.parse(postsArmazenados);
      setTotalPosts(posts.length);
    }
  }, []);

  // Função para validar URL
  const validarURL = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Função para validar data
  const validarData = (data: string): boolean => {
    const hoje = new Date();
    const dataInformada = new Date(data);
    hoje.setHours(0, 0, 0, 0);
    dataInformada.setHours(0, 0, 0, 0);
    return dataInformada >= hoje;
  };

  // Função para validar o formulário
  const validarFormulario = (): boolean => {
    if (!titulo.trim()) {
      toast.error('O título é obrigatório!');
      return false;
    }

    if (!descricao.trim()) {
      toast.error('A descrição é obrigatória!');
      return false;
    }

    if (!urlImagem.trim()) {
      toast.error('A URL da imagem é obrigatória!');
      return false;
    }

    if (!validarURL(urlImagem)) {
      toast.error('A URL da imagem deve começar com http:// ou https://');
      return false;
    }

    if (!dataPublicacao) {
      toast.error('A data de publicação é obrigatória!');
      return false;
    }

    if (!validarData(dataPublicacao)) {
      toast.error('A data de publicação deve ser hoje ou uma data futura!');
      return false;
    }

    if (!tipoPost) {
      toast.error('O tipo do post é obrigatório!');
      return false;
    }

    return true;
  };

  // Função para salvar post
  const salvarPost = () => {
    if (!validarFormulario()) {
      return;
    }

    const novoPost: Post = {
      id: Date.now().toString(),
      titulo,
      descricao,
      urlImagem,
      dataPublicacao,
      tipoPost,
      criadoEm: new Date().toISOString()
    };

    // Recuperar posts existentes
    const postsExistentes = localStorage.getItem('posts');
    const posts = postsExistentes ? JSON.parse(postsExistentes) : [];

    // Adicionar novo post
    posts.push(novoPost);

    // Salvar no localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Atualizar contador
    setTotalPosts(posts.length);

    // Limpar formulário
    setTitulo('');
    setDescricao('');
    setUrlImagem('');
    setDataPublicacao('');
    setTipoPost('');

    toast.success('Post criado com sucesso!');
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        <div className="card">
          <h1 className="main-title">
            Painel de Gerenciamento
          </h1>
          <p className="posts-counter">
            Atualmente, você tem <span className="posts-count">{totalPosts} posts</span> cadastrados
          </p>

          <div className="form-container">
            <h2 className="form-title">Novo Post</h2>

            <div className="form-fields">
              {/* Campo Título */}
              <div className="field-group">
                <label htmlFor="titulo" className="field-label">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Título"
                  className="field-input"
                />
              </div>

              {/* Campo Descrição */}
              <div className="field-group">
                <label htmlFor="descricao" className="field-label">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição"
                  rows={6}
                  className="field-textarea"
                />
              </div>

              {/* Campo URL da Imagem */}
              <div className="field-group">
                <label htmlFor="urlImagem" className="field-label">
                  URL da imagem de capa
                </label>
                <input
                  type="url"
                  id="urlImagem"
                  value={urlImagem}
                  onChange={(e) => setUrlImagem(e.target.value)}
                  placeholder="URL da imagem de capa"
                  className="field-input"
                />
              </div>

              {/* Campo Data de Publicação */}
              <div className="field-group">
                <label htmlFor="dataPublicacao" className="field-label">
                  Data de publicação
                </label>
                <input
                  type="date"
                  id="dataPublicacao"
                  value={dataPublicacao}
                  onChange={(e) => setDataPublicacao(e.target.value)}
                  className="field-input"
                />
              </div>

              {/* Campo Tipo do Post */}
              <div className="field-group">
                <label htmlFor="tipoPost" className="field-label">
                  Tipo do post
                </label>
                <select
                  id="tipoPost"
                  value={tipoPost}
                  onChange={(e) => setTipoPost(e.target.value)}
                  className="field-select"
                >
                  <option value="">Selecione o tipo do post</option>
                  <option value="artigo">Artigo</option>
                  <option value="noticia">Notícia</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="entrevista">Entrevista</option>
                </select>
              </div>

              {/* Botão Salvar */}
              <div className="button-container">
                <button
                  onClick={salvarPost}
                  className="submit-button"
                >
                  Criar Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;