import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  width: 100%;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  padding: 32px 0px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;

    background: transparent;
    border: 0;

    svg {
      color: #f4ede8;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > div {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }

  span {
    color: #f4ede8;
    line-height: 30px;
  }

  a {
    text-decoration: none;
    color: #ff9000;

    &:hover {
      opacity: 0.8;
    }
  }
`;

interface AvatarProps {
  src: string;
}
export const Avatar = styled.div<AvatarProps>`
  width: 67px;
  height: 67px;
  border-radius: 50%;
  background: url(${(props) => props.src});
  background-position: center;
  background-size: cover;
`;

export const Content = styled.div`
  max-width: 1120px;
  display: flex;
  margin: 64px auto;
`;
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
    color: #f4ede8;
  }

  > p {
    display: flex;
    align-items: center;
    margin-top: 5px;

    span {
      color: #ff9000;
    }

    span + span::before {
      content: '|';
      width: 1px;
      color: #ff9000;
      height: 12px;
      margin: 0 8px;
    }
  }

  h2 {
    margin-top: 50px;
    color: #999591;
    font-size: 25px;
    font-weight: 400;
  }
`;
export const NextAppointment = styled.div`
  margin-top: 20px;
  padding: 16px 24px;
  background: #3e3b47;
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }

  p {
    color: #f4ede8;
    font-size: 30px;
    font-weight: 500;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #999591;
  }

  svg {
    color: #ff9900;
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`;

export const Section = styled.section`
  margin-top: 45px;

  > strong {
    font-size: 20px;
    color: #999591;
    line-height: 26px;
    display: block;
    border-bottom: solid 1px #999591;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-right: 25px;
    width: 70px;
  }

  svg {
    color: #ff9900;
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }

  > div {
    flex: 1;
    display: flex;
    align-items: center;

    background: #3e3b47;

    padding: 16px 24px;
    border-radius: 10px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }

    p {
      color: #f4ede8;
      font-size: 30px;
      font-weight: 500;
    }
  }
`;

export const Calendar = styled.div`
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
