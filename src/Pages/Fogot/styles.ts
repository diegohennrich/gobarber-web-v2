import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import BgImg from '../../Assets/sign-in-background.png';

const LeftAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  },
  to {

    opacity: 1;
    transform: translateX(0);
  }
`;
export const Container = styled.div`
  height: 100vh;
  align-items: stretch;
  display: flex;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;
`;

export const AnimatedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  animation: ${LeftAnimation} 1s;

  > a {
    color: #ff9000;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-top: 24px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 15px;
    }
  }

  form {
    margin-top: 80px;
    width: 100%;
    max-width: 340px;
    text-align: center;

    a {
      color: #f4ede8;
      text-decoration: none;
      margin-top: 24px;
      display: block;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    h1 {
      margin-bottom: 30px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${BgImg}) no-repeat center;
  background-size: cover;
`;
