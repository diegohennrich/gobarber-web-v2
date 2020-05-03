import React, { FC } from 'react';
import { useTransition } from 'react-spring';
import { Container } from './styles';
import Toast from './Toast';

import { ToastMessage } from '../../Hooks/Toast';

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer: FC<ToastProps> = ({ messages }) => {
  const messagesWithEffect = useTransition(messages, (message) => message.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });
  return (
    <Container>
      {messagesWithEffect.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};
export default ToastContainer;
