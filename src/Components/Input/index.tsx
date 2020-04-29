import React, {
  FC,
  InputHTMLAttributes,
  ComponentType,
  useRef,
  useEffect,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ComponentType<IconBaseProps>;
}
const Input: FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName, // name do input nativo
      ref: inputRef.current, // referencia para acessar ele do elemento pai
      path: 'value', // valor que será pego do input
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} ref={inputRef} defaultValue={defaultValue} />
    </Container>
  );
};

export default Input;
