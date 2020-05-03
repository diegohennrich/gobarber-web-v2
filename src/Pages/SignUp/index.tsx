import React, { FC, useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../Hooks/Toast';
import api from '../../Services/api';

import GetValidationErrors from '../../Utils/GetValidationErrors';

import { Container, Content, Background, AnimatedContent } from './styles';
import Logo from '../../Assets/logo.svg';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

interface CadastroData {
  name: string;
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const handleSumbit = useCallback(
    async (data: CadastroData) => {
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

        await api.post('/user', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastrado com sucesso!',
          description: 'Você já pode fazer logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Erro ao cadastrar',
        });
      }
    },
    [addToast, history]
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContent>
          <img src={Logo} alt="Logo" />
          <Form onSubmit={handleSumbit} ref={formRef}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} placeholder="Senha" />
            <Button type="submit">Cadastar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={20} />
            Voltar para logon
          </Link>
        </AnimatedContent>
      </Content>
    </Container>
  );
};

export default SignUp;
