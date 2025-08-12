// js/main.js - Inicialização da Aplicação

// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o React está disponível
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
        console.error('React ou ReactDOM não foi carregado corretamente');
        return;
    }

    // Criar root element para React 18
    const container = document.getElementById('root');
    if (!container) {
        console.error('Elemento #root não encontrado');
        return;
    }

    // Renderizar a aplicação
    try {
        const root = ReactDOM.createRoot(container);
        root.render(React.createElement(App));
        console.log('✅ Aplicação carregada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao renderizar a aplicação:', error);
        
        // Fallback para versões anteriores do React
        try {
            ReactDOM.render(React.createElement(App), container);
            console.log('✅ Aplicação carregada com ReactDOM.render (fallback)');
        } catch (fallbackError) {
            console.error('❌ Erro no fallback:', fallbackError);
        }
    }
});