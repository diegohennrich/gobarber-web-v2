import React, { FC, useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useToast } from '../../Hooks/Toast';
import api from '../../Services/api';

import GetValidationErrors from '../../Utils/GetValidationErrors';

import { Container, Content, Avatar, AvatarImg } from './styles';

import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { useAuth } from '../../Hooks/Auth';

interface CadastroData {
  name: string;
  email: string;
  password: string;
}

const Profile: FC = () => {
  const { addToast } = useToast();
  const { user } = useAuth();

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
    [addToast]
  );
  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form onSubmit={handleSumbit} ref={formRef}>
          <Avatar>
            <AvatarImg src={user.avatar_url} />
            <button type="button">
              <FiCamera />
            </button>
          </Avatar>
          <h1>Meu Perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 30 }}
            name="old_password"
            icon={FiLock}
            placeholder="Senha Atual"
          />
          <Input name="password" icon={FiLock} placeholder="Nova Senha" />
          <Input
            name="password_confirmation"
            icon={FiLock}
            placeholder="Confirmar Senha"
          />
          <Button type="submit">Atualizar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
