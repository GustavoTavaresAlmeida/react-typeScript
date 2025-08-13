// src/App.tsx - Componente Principal da Aplicação TypeScript

import React, { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import PostForm from '@/components/PostForm';
import PostsList from '@/components/PostsList';

// Importar estilos CSS
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

type ActiveTab = 'form' | 'posts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('form');
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { toast, showToast, hideToast } = useToast();

  const handlePostCreated = (): void => {
    // Forçar atualização da lista de posts
    setRefreshKey(prev => prev + 1);
    // Mudar para aba de posts após criar
    setActiveTab('posts');
  };

  const handleTabChange = (tab: ActiveTab): void => {
    setActiveTab(tab);
  };

  const getTabButtonStyle = (tab: ActiveTab): React.CSSProperties => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    backgroundColor: activeTab === tab ? '#2563eb' : '#f3f4f6',
    color: activeTab === tab ? 'white' : '#374151'
  });

  return (
    <div className="app-container">
      <div className="main-wrapper">
        {/* Header Principal */}
        <header className="card text-center mb-2">
          <h1 className="main-title">
            Sistema de Gerenciamento de Posts
          </h1>
          <p className="posts-counter">
            Gerencie seus posts de forma simples e eficiente
          </p>
        </header>

        {/* Navegação por Abas */}
        <nav className="card mb-2">
          <div
            className="tab-navigation"
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem'
            }}
          >
            <button
              className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => handleTabChange('form')}
              style={getTabButtonStyle('form')}
              type="button"
            >
              📝 Criar Post
            </button>
            
            <button
              className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => handleTabChange('posts')}
              style={getTabButtonStyle('posts')}
              type="button"
            >
              📋 Lista de Posts
            </button>
          </div>
        </nav>

        {/* Conteúdo das Abas */}
        <main className="tab-content">
          {activeTab === 'form' ? (
            <div
              className="content-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <PostForm
                onPostCreated={handlePostCreated}
                showToast={showToast}
              />
            </div>
          ) : (
            <PostsList refreshKey={refreshKey} />
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default App;