import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../Components/ToastContainer';

interface ToastData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastData>({} as ToastData);

export const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const message = {
        id,
        title,
        type,
        description,
      };

      setMessages((state) => [...state, message]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setMessages((status) => status.filter((i) => i.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }

  return context;
};
