import React, { FC, useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
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
  email: string;
}

const SignIn: FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSumbit = useCallback(
    async (data: FormFields) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail inválido'),
        });

        await schema.validate(data, { abortEarly: false });
        const { email } = data;
        await api.post('/password/forgot', { email });

        addToast({
          type: 'success',
          title: 'Recuperação enviada!',
          description:
            'Enviamos um e-mail para você. Por favor, verifique sua caixa de entrada.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: 'Verifique as suas credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );
  return (
    <Container>
      <Content>
        <AnimatedContent>
          <img src={Logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSumbit}>
            <h1>Recuperação de senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button type="submit" loading={loading}>
              Recuperar
            </Button>
          </Form>

          <Link to="/signup">
            <FiLogIn size={20} />
            Voltar para o login
          </Link>
        </AnimatedContent>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
