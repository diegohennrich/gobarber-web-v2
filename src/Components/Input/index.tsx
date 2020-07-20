import React, {
  FC,
  InputHTMLAttributes,
  ComponentType,
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Errors } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: ComponentType<IconBaseProps>;
}
const Input: FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName, // name do input nativo
      ref: inputRef.current, // referencia para acessar ele do elemento pai
      path: 'value', // valor que será pego do input
    });
  }, [fieldName, registerField]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isFilled}
      isError={!!error}
    >
      {Icon && <Icon size={20} />}
      <input
        ref={inputRef}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {error && (
        <Errors title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Errors>
      )}
    </Container>
  );
};

export default Input;
