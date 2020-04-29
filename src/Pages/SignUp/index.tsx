import React, { FC } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import Logo from '../../Assets/logo.svg';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const SignUp: FC = () => {
  function handleSumbit(data: Record<string, any>): void {
    console.log(data);
  }
  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="Logo" />
        <Form onSubmit={handleSumbit}>
          <h1>Faça seu cadastro</h1>
          <Input name="nome" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="senha" icon={FiLock} placeholder="Senha" />
          <Button type="submit">Cadastar</Button>
        </Form>

        <a href="signup">
          <FiArrowLeft size={20} />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
