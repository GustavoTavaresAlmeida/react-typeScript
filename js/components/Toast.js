// js/components/Toast.js - Componente de Notificação

const Toast = ({ message, type, onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return React.createElement('div', {
        className: `toast toast-${type}`,
        children: [
            React.createElement('span', {
                key: 'icon',
                children: type === 'success' ? '✅' : '❌'
            }),
            React.createElement('span', {
                key: 'message',
                children: message
            }),
            React.createElement('button', {
                key: 'close',
                className: 'toast-close-btn',
                onClick: onClose,
                children: '×'
            })
        ]
    });
};