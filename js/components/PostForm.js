// js/components/PostForm.js - Componente Formulário de Posts

const PostForm = ({ onPostCreated, showToast }) => {
    const [titulo, setTitulo] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [urlImagem, setUrlImagem] = React.useState('');
    const [dataPublicacao, setDataPublicacao] = React.useState('');
    const [tipoPost, setTipoPost] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

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

    // Função para salvar post
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

        // Obter posts existentes do localStorage
        const postsExistentes = localStorage.getItem("posts");
        const posts = postsExistentes ? JSON.parse(postsExistentes) : [];
        
        // Adicionar novo post
        const novosPosts = [...posts, novoPost];
        localStorage.setItem("posts", JSON.stringify(novosPosts));

        // Limpar formulário
        setTitulo('');
        setDescricao('');
        setUrlImagem('');
        setDataPublicacao('');
        setTipoPost('');

        setIsLoading(false);
        showToast('Post criado com sucesso!', 'success');
        
        // Notificar componente pai
        if (onPostCreated) {
            onPostCreated();
        }
    };

    return React.createElement('div', {
        className: 'form-container',
        children: [
            React.createElement('h2', {
                key: 'title',
                className: 'section-title',
                children: 'Novo Post'
            }),
            React.createElement('div', {
                key: 'fields',
                className: 'form-fields',
                children: [
                    // Campo Título
                    React.createElement('div', {
                        key: 'titulo-group',
                        className: 'field-group',
                        children: [
                            React.createElement('label', {
                                key: 'label',
                                htmlFor: 'titulo',
                                className: 'field-label',
                                children: 'Título'
                            }),
                            React.createElement('input', {
                                key: 'input',
                                id: 'titulo',
                                className: 'field-input',
                                value: titulo,
                                onChange: (e) => setTitulo(e.target.value),
                                placeholder: 'Título do post'
                            })
                        ]
                    }),
                    // Campo Descrição
                    React.createElement('div', {
                        key: 'descricao-group',
                        className: 'field-group',
                        children: [
                            React.createElement('label', {
                                key: 'label',
                                htmlFor: 'descricao',
                                className: 'field-label',
                                children: 'Descrição'
                            }),
                            React.createElement('textarea', {
                                key: 'textarea',
                                id: 'descricao',
                                className: 'field-textarea',
                                value: descricao,
                                onChange: (e) => setDescricao(e.target.value),
                                placeholder: 'Descrição do post',
                                rows: 4
                            })
                        ]
                    }),
                    // Campo URL da Imagem
                    React.createElement('div', {
                        key: 'imagem-group',
                        className: 'field-group',
                        children: [
                            React.createElement('label', {
                                key: 'label',
                                htmlFor: 'urlImagem',
                                className: 'field-label',
                                children: 'URL da imagem de capa'
                            }),
                            React.createElement('input', {
                                key: 'input',
                                type: 'url',
                                id: 'urlImagem',
                                className: 'field-input',
                                value: urlImagem,
                                onChange: (e) => setUrlImagem(e.target.value),
                                placeholder: 'https://exemplo.com/imagem.jpg'
                            })
                        ]
                    }),
                    // Campo Data de Publicação
                    React.createElement('div', {
                        key: 'data-group',
                        className: 'field-group',
                        children: [
                            React.createElement('label', {
                                key: 'label',
                                htmlFor: 'dataPublicacao',
                                className: 'field-label',
                                children: 'Data de publicação'
                            }),
                            React.createElement('input', {
                                key: 'input',
                                type: 'date',
                                id: 'dataPublicacao',
                                className: 'field-input',
                                value: dataPublicacao,
                                onChange: (e) => setDataPublicacao(e.target.value),
                                min: new Date().toISOString().split('T')[0]
                            })
                        ]
                    }),
                    // Campo Tipo do Post
                    React.createElement('div', {
                        key: 'tipo-group',
                        className: 'field-group',
                        children: [
                            React.createElement('label', {
                                key: 'label',
                                htmlFor: 'tipoPost',
                                className: 'field-label',
                                children: 'Tipo do post'
                            }),
                            React.createElement('select', {
                                key: 'select',
                                id: 'tipoPost',
                                className: 'field-select',
                                value: tipoPost,
                                onChange: (e) => setTipoPost(e.target.value),
                                children: [
                                    React.createElement('option', {
                                        key: 'default',
                                        value: '',
                                        children: 'Selecione o tipo do post'
                                    }),
                                    React.createElement('option', {
                                        key: 'artigo',
                                        value: 'artigo',
                                        children: 'Artigo'
                                    }),
                                    React.createElement('option', {
                                        key: 'noticia',
                                        value: 'noticia',
                                        children: 'Notícia'
                                    }),
                                    React.createElement('option', {
                                        key: 'tutorial',
                                        value: 'tutorial',
                                        children: 'Tutorial'
                                    }),
                                    React.createElement('option', {
                                        key: 'entrevista',
                                        value: 'entrevista',
                                        children: 'Entrevista'
                                    })
                                ]
                            })
                        ]
                    }),
                    // Botão Salvar
                    React.createElement('div', {
                        key: 'button-container',
                        className: 'button-container',
                        children: React.createElement('button', {
                            className: `btn btn-primary btn-full ${isLoading ? 'loading' : ''}`,
                            onClick: salvarPost,
                            disabled: isLoading,
                            children: [
                                isLoading && React.createElement('div', {
                                    key: 'spinner',
                                    className: 'loading-spinner'
                                }),
                                React.createElement('span', {
                                    key: 'text',
                                    children: isLoading ? 'Criando...' : 'Criar Post'
                                })
                            ]
                        })
                    })
                ]
            })
        ]
    });
};