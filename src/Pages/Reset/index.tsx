import React, { FC, useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, Background, AnimatedContent } from './styles';
import GetValidationErrors from '../../Utils/GetValidationErrors';
import Logo from '../../Assets/logo.svg';

import { useToast } from '../../Hooks/Toast';

import Input from '../../Components/Input';
import Button from '../../Components/Button';
import api from '../../Services/api';

interface FormFields {
  password: string;
  password_confirmation: string;
}

const Reset: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const location = useLocation();

  const handleSumbit = useCallback(
    async (data: FormFields) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não são iguais'
          ),
        });

        await schema.validate(data, { abortEarly: false });
        const { password, password_confirmation } = data;

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Por favor, tente novamente.',
        });
      }
    },
    [addToast, history, location.search]
  );
  return (
    <Container>
      <Content>
        <AnimatedContent>
          <img src={Logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSumbit}>
            <h1>Resetar Seenha</h1>

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Confirmação de senha"
            />
            <Button type="submit">Resetar</Button>
          </Form>
        </AnimatedContent>
      </Content>
      <Background />
    </Container>
  );
};

export default Reset;
