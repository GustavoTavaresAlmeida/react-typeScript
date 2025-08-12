// js/components/Post.js - Componente Individual do Post

const Post = ({ id, tipo, titulo, descricao, capa, data, handleDelete }) => {
    const formatarData = (dataString) => {
        return new Date(dataString).toLocaleDateString('pt-BR');
    };

    const getTipoClass = (tipo) => {
        const classes = {
            'ARTIGO': 'tipo-artigo',
            'NOTÍCIA': 'tipo-noticia',
            'TUTORIAL': 'tipo-tutorial',
            'ENTREVISTA': 'tipo-entrevista'
        };
        return classes[tipo.toUpperCase()] || 'tipo-artigo';
    };

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x180/f3f4f6/9ca3af?text=Imagem+não+encontrada';
    };

    return React.createElement('div', {
        className: 'post-card',
        children: [
            React.createElement('img', {
                key: 'image',
                src: capa,
                alt: titulo,
                className: 'post-image',
                onError: handleImageError
            }),
            React.createElement('div', {
                key: 'content',
                className: 'post-content',
                children: [
                    React.createElement('span', {
                        key: 'tipo',
                        className: `tipo-tag ${getTipoClass(tipo)}`,
                        children: tipo
                    }),
                    React.createElement('h3', {
                        key: 'titulo',
                        className: 'post-title',
                        children: titulo
                    }),
                    React.createElement('p', {
                        key: 'descricao',
                        className: 'post-description',
                        children: descricao
                    }),
                    React.createElement('div', {
                        key: 'footer',
                        className: 'post-footer',
                        children: [
                            React.createElement('span', {
                                key: 'data',
                                className: 'data-publicacao',
                                children: `Publicado em: ${formatarData(data)}`
                            }),
                            React.createElement('button', {
                                key: 'delete',
                                className: 'btn btn-danger',
                                onClick: () => handleDelete(id),
                                children: 'Excluir'
                            })
                        ]
                    })
                ]
            })
        ]
    });
};