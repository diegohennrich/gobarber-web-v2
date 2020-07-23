import React, { FC, useCallback, useRef, useEffect } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

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
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const Profile: FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  console.log('user: ', user);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSumbit = useCallback(
    async (data: CadastroData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'As senhas não são iguais'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const payload = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', payload);

        updateUser(response.data.user);

        history.push('/dashboard');
        addToast({
          type: 'success',
          title: 'Atualizado com sucesso!',
          description: 'Seus dados foram atualizados.',
        });
      } catch (err) {
        console.log('deu erro');
        if (err instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        console.log('err', err.response.data);

        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description: err.response.data.message,
        });
      }
    },
    [addToast, updateUser, history]
  );

  // useEffect(() => {
  //   if (formRef.current) {
  //     formRef.current.setData({ name: user.name, email: user.email });
  //   }
  // }, [formRef, user.email, user.name]);
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
        <Form
          onSubmit={handleSumbit}
          initialData={{ name: user.name, email: user.email }}
          ref={formRef}
        >
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
