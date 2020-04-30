import React, { FC, useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import GetValidationErrors from '../../Utils/GetValidationErrors';
import Logo from '../../Assets/logo.svg';

import { useAuth } from '../../Hooks/AuthContext';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

interface FormFields {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSumbit = useCallback(
    async (data: FormFields) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });
        const { email, password } = data;
        signIn({ email, password });
      } catch (e) {
        formRef.current?.setErrors(GetValidationErrors(e));
      }
    },
    [signIn]
  );
  return (
    <Container>
      <Content>
        <img src={Logo} alt="Logo" />
        <Form ref={formRef} onSubmit={handleSumbit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="signup">
          <FiLogIn size={20} />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
