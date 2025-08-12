// js/App.js - Componente Principal da Aplicação

const App = () => {
    const [activeTab, setActiveTab] = React.useState('form');
    const [toast, setToast] = React.useState(null);
    const [refreshPosts, setRefreshPosts] = React.useState(0);

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const handlePostCreated = () => {
        // Forçar atualização da lista de posts
        setRefreshPosts(prev => prev + 1);
        // Mudar para aba de posts após criar
        setActiveTab('posts');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return React.createElement('div', {
        className: 'app-container',
        children: [
            React.createElement('div', {
                key: 'wrapper',
                className: 'main-wrapper',
                children: [
                    // Header Principal
                    React.createElement('div', {
                        key: 'header',
                        className: 'card text-center mb-2',
                        children: [
                            React.createElement('h1', {
                                key: 'title',
                                className: 'main-title',
                                children: 'Sistema de Gerenciamento de Posts'
                            }),
                            React.createElement('p', {
                                key: 'subtitle',
                                className: 'posts-counter',
                                children: 'Gerencie seus posts de forma simples e eficiente'
                            })
                        ]
                    }),
                    
                    // Navegação por Abas
                    React.createElement('div', {
                        key: 'navigation',
                        className: 'card mb-2',
                        children: React.createElement('div', {
                            className: 'tab-navigation',
                            style: {
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                borderBottom: '1px solid #e5e7eb',
                                paddingBottom: '1rem'
                            },
                            children: [
                                React.createElement('button', {
                                    key: 'form-tab',
                                    className: `tab-button ${activeTab === 'form' ? 'active' : ''}`,
                                    onClick: () => handleTabChange('form'),
                                    style: {
                                        padding: '0.75rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: activeTab === 'form' ? '#2563eb' : '#f3f4f6',
                                        color: activeTab === 'form' ? 'white' : '#374151'
                                    },
                                    children: '📝 Criar Post'
                                }),
                                React.createElement('button', {
                                    key: 'posts-tab',
                                    className: `tab-button ${activeTab === 'posts' ? 'active' : ''}`,
                                    onClick: () => handleTabChange('posts'),
                                    style: {
                                        padding: '0.75rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: activeTab === 'posts' ? '#2563eb' : '#f3f4f6',
                                        color: activeTab === 'posts' ? 'white' : '#374151'
                                    },
                                    children: '📋 Lista de Posts'
                                })
                            ]
                        })
                    }),

                    // Conteúdo das Abas
                    React.createElement('div', {
                        key: 'content',
                        className: 'tab-content',
                        children: activeTab === 'form' 
                            ? React.createElement('div', {
                                className: 'content-grid',
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    maxWidth: '600px',
                                    margin: '0 auto'
                                },
                                children: React.createElement(PostForm, {
                                    onPostCreated: handlePostCreated,
                                    showToast: showToast
                                })
                            })
                            : React.createElement(PostsList, {
                                key: refreshPosts // Força re-render quando um post é criado
                            })
                    })
                ]
            }),

            // Toast Notification
            toast && React.createElement(Toast, {
                key: 'toast',
                message: toast.message,
                type: toast.type,
                onClose: () => setToast(null)
            })
        ]
    });
};