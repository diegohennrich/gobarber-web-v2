import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  > header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #28262e;
    height: 144px;

    > div {
      width: 100%;
      max-width: 1120px;

      > a {
        position: relative;
        z-index: 99;
      }

      svg {
        width: 24px;
        height: 24px;
        color: #999591;
      }
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  margin-top: -180px;

  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;

  form {
    margin-top: 80px;
    width: 100%;
    max-width: 340px;

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
      font-size: 23px;
    }
  }
`;

export const Avatar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;

  > button {
    background: #ff9000;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 0;
    margin-left: auto;
    margin-top: -50px;
    margin-right: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#FF9000')};
    }

    > svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
  }
`;

interface AvatarI {
  src: string;
}
export const AvatarImg = styled.div<AvatarI>`
  width: 186px;
  height: 186px;
  border-radius: 50%;
  background: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
`;
