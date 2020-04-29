import React, { FC } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Logo from '../../Assets/logo.svg';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const SignIn: FC = () => (
  <Container>
    <Content>
      <img src={Logo} alt="Logo" />
      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input name="senha" icon={FiLock} placeholder="Senha" />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="signup">
        <FiLogIn size={20} />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
