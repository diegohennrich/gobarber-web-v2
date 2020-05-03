import React, { FC, useEffect } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../Hooks/Toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}
const Toast: FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type || 'info'}
      hasDescription={!!message.description}
      style={style}
    >
      <FiAlertCircle size={20} />

      <div>
        <strong>{message.title}</strong>
        {message.description && (
          <p>Não foi possível fazer login na aplicação</p>
        )}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
