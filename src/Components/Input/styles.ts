import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border: solid 2px #232129;
  border-radius: 10px;
  padding: 16px;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    color: #f4ede8;
    background: transparent;
    border: 0;

    & ::placeholder {
      color: #666360;
    }
  }

  svg {
    color: #666360;
    margin-right: 15px;
  }
`;
