import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Tipo para o elemento root
const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

// Renderizar a aplicação
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Adicionar classe para indicar que o app carregou
document.body.classList.add('app-loaded');

// Service Worker (opcional - para PWA no futuro)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }