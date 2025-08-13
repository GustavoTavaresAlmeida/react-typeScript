// src/components/PostForm.tsx - Componente Formulário de Posts

import React, { useState } from 'react';
import { PostFormProps, PostFormData, TipoPost, TIPO_POST_OPTIONS } from '@/types';
import { 
  validarTitulo, 
  validarDescricao, 
  validarUrlImagem, 
  validarDataPublicacao, 
  validarTipoPost,
  gerarId,
  getMinDate 
} from '@/utils';
import { usePosts } from '@/hooks/usePosts';

const PostForm: React.FC<PostFormProps> = ({ onPostCreated, showToast }) => {
  const { addPost } = usePosts();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<PostFormData>({
    titulo: '',
    descricao: '',
    urlImagem: '',
    dataPublicacao: '',
    tipoPost: ''
  });

  // Handlers para os campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value as TipoPost | ''
    }));
  };

  // Validação completa do formulário
  const validarFormulario = (): boolean => {
    const validacoes = [
      validarTitulo(formData.titulo),
      validarDescricao(formData.descricao),
      validarUrlImagem(formData.urlImagem),
      validarDataPublicacao(formData.dataPublicacao),
      validarTipoPost(formData.tipoPost)
    ];

    for (const validacao of validacoes) {
      if (!validacao.isValid) {
        showToast(validacao.message!, 'error');
        return false;
      }
    }

    return true;
  };

  // Limpar formulário
  const limparFormulario = (): void => {
    setFormData({
      titulo: '',
      descricao: '',
      urlImagem: '',
      dataPublicacao: '',
      tipoPost: ''
    });
  };

  // Submit do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 500));

      const novoPost = {
        id: gerarId(),
        titulo: formData.titulo.trim(),
        descricao: formData.descricao.trim(),
        capa: formData.urlImagem.trim(),
        data: formData.dataPublicacao,
        tipo: formData.tipoPost as TipoPost,
        criadoEm: new Date().toISOString()
      };

      await addPost(novoPost);
      limparFormulario();
      showToast('Post criado com sucesso!', 'success');
      
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Erro ao criar post:', error);
      showToast('Erro ao criar post. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="section-title">Novo Post</h2>

      <form onSubmit={handleSubmit} className="form-fields">
        {/* Campo Título */}
        <div className="field-group">
          <label htmlFor="titulo" className="field-label">
            Título *
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="field-input"
            value={formData.titulo}
            onChange={handleInputChange}
            placeholder="Título do post"
            required
            disabled={isLoading}
          />
        </div>

        {/* Campo Descrição */}
        <div className="field-group">
          <label htmlFor="descricao" className="field-label">
            Descrição *
          </label>
          <textarea
            id="descricao"
            name="descricao"
            className="field-textarea"
            value={formData.descricao}
            onChange={handleTextareaChange}
            placeholder="Descrição do post"
            rows={4}
            required
            disabled={isLoading}
          />
        </div>

        {/* Campo URL da Imagem */}
        <div className="field-group">
          <label htmlFor="urlImagem" className="field-label">
            URL da imagem de capa *
          </label>
          <input
            type="url"
            id="urlImagem"
            name="urlImagem"
            className="field-input"
            value={formData.urlImagem}
            onChange={handleInputChange}
            placeholder="https://exemplo.com/imagem.jpg"
            required
            disabled={isLoading}
          />
        </div>

        {/* Campo Data de Publicação */}
        <div className="field-group">
          <label htmlFor="dataPublicacao" className="field-label">
            Data de publicação *
          </label>
          <input
            type="date"
            id="dataPublicacao"
            name="dataPublicacao"
            className="field-input"
            value={formData.dataPublicacao}
            onChange={handleInputChange}
            min={getMinDate()}
            required
            disabled={isLoading}
          />
        </div>

        {/* Campo Tipo do Post */}
        <div className="field-group">
          <label htmlFor="tipoPost" className="field-label">
            Tipo do post *
          </label>
          <select
            id="tipoPost"
            name="tipoPost"
            className="field-select"
            value={formData.tipoPost}
            onChange={handleSelectChange}
            required
            disabled={isLoading}
          >
            <option value="">Selecione o tipo do post</option>
            {TIPO_POST_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botão Submit */}
        <div className="button-container">
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading && <div className="loading-spinner" />}
            <span>{isLoading ? 'Criando...' : 'Criar Post'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;