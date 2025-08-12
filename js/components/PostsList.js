// js/components/PostsList.js - Componente Lista de Posts

const PostsList = () => {
    const [posts, setPosts] = React.useState([]);
    const [contadorPorTipo, setContadorPorTipo] = React.useState({});

    // Inserir posts no localStorage se não existirem
    React.useEffect(() => {
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
    React.useEffect(() => {
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

    const totalPosts = posts.length;

    return React.createElement('div', {
        className: 'container',
        children: [
            React.createElement('div', {
                key: 'header',
                className: 'header',
                children: React.createElement('h1', {
                    className: 'main-title',
                    children: 'Painel de Gerenciamento'
                })
            }),
            React.createElement('div', {
                key: 'contador',
                className: 'contador-container',
                children: [
                    React.createElement('h2', {
                        key: 'titulo',
                        className: 'contador-titulo',
                        children: 'Resumo dos Posts'
                    }),
                    React.createElement('p', {
                        key: 'texto',
                        className: 'contador-texto',
                        children: [
                            'Atualmente, você tem ',
                            React.createElement('span', {
                                className: 'posts-count',
                                children: `${totalPosts} posts`
                            }),
                            ' cadastrados'
                        ]
                    }),
                    totalPosts > 0 && React.createElement('div', {
                        key: 'grid',
                        className: 'contador-grid',
                        children: Object.entries(contadorPorTipo).map(([tipo, quantidade]) =>
                            React.createElement('div', {
                                key: tipo,
                                className: 'contador-item',
                                children: [
                                    React.createElement('div', {
                                        key: 'label',
                                        className: 'contador-label',
                                        children: tipo
                                    }),
                                    React.createElement('div', {
                                        key: 'numero',
                                        className: 'contador-numero',
                                        children: quantidade
                                    })
                                ]
                            })
                        )
                    })
                ]
            }),
            posts.length === 0 
                ? React.createElement('div', {
                    key: 'empty',
                    className: 'empty-state',
                    children: [
                        React.createElement('div', {
                            key: 'icon',
                            className: 'empty-state-icon',
                            children: '📝'
                        }),
                        React.createElement('p', {
                            key: 'text',
                            className: 'empty-state-text',
                            children: 'Nenhum post encontrado'
                        }),
                        React.createElement('p', {
                            key: 'subtext',
                            className: 'empty-state-subtext',
                            children: 'Crie seu primeiro post para começar!'
                        })
                    ]
                })
                : React.createElement('div', {
                    key: 'posts',
                    className: 'posts-grid',
                    children: posts.map((post) =>
                        React.createElement(Post, {
                            key: post.id,
                            id: post.id,
                            tipo: post.tipo.toUpperCase(),
                            titulo: post.titulo,
                            descricao: post.descricao,
                            capa: post.capa,
                            data: post.data,
                            handleDelete: handleDelete
                        })
                    )
                })
        ]
    });
};