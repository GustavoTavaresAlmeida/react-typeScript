// src/main.tsx - Ponto de Entrada da Aplicação TypeScript

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Verificar se o elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Elemento root não encontrado. ' +
    'Certifique-se de que existe um elemento com id="root" no HTML.'
  );
}

// Criar root e renderizar aplicação
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log de sucesso no desenvolvimento
if (import.meta.env.DEV) {
  console.log('✅ Aplicação TypeScript carregada com sucesso!');
  console.log('🚀 Rodando em modo desenvolvimento');
}