import React, { FC, useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import GetValidationErrors from '../../Utils/GetValidationErrors';

import { Container, Content, Background } from './styles';
import Logo from '../../Assets/logo.svg';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

const SignUp: FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSumbit = useCallback(async (data: Record<string, any>) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail inválido'),
        password: Yup.string().min(6, 'Mínimo 6 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (e) {
      formRef.current?.setErrors(GetValidationErrors(e));
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <img src={Logo} alt="Logo" />
        <Form onSubmit={handleSumbit} ref={formRef}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} placeholder="Senha" />
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
