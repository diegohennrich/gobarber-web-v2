import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import { Link } from 'react-router-dom';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import {
  Header,
  HeaderContent,
  Profile,
  Avatar,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
  Section,
  Appointment,
} from './style';
import logo from '../../Assets/logo.svg';
import { useAuth } from '../../Hooks/Auth';
import 'react-day-picker/lib/style.css';
import api from '../../Services/api';

interface DayAvailable {
  day: number;
  available: boolean;
}

interface Appointments {
  id: string;
  date: string;
  dateFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: FC = () => {
  const { user, signOut } = useAuth();
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<DayAvailable[]>(
    []
  );

  const defaultImg =
    'https://img.ohmymag.com.br/article/animal/o-porco-pode-ser-um-animal-domestico_e3f05f50e4ebac25c57ce1da6bf1dd1eb7950d09.jpg';

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDay(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const daysOff = useMemo(() => {
    const days = monthAvailability
      .filter((i) => i.available === false)
      .map((i) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, i.day);
      });

    return days;
  }, [currentMonth, monthAvailability]);

  useEffect(() => {
    api
      .get(
        `/providers/${user.id}/month-availability?month=${
          currentMonth.getMonth() + 1
        }&year=${currentMonth.getFullYear()}`
      )
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointments[]>(
        `/providers/schedule?year=${selectedDay.getFullYear()}&month=${
          selectedDay.getMonth() + 1
        }&day=${selectedDay.getDate()}`
      )
      .then((resp) => {
        const { data } = resp;

        const formatedPayload = data.map((i) => {
          return { ...i, dateFormatted: format(parseISO(i.date), 'HH:mm') };
        });
        setAppointments(formatedPayload);
      });
  }, [selectedDay]);

  const WeekDay = useMemo(() => {
    return format(selectedDay, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDay]);

  const DayName = useMemo(() => {
    return format(selectedDay, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDay]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((i) => parseISO(i.date).getHours() < 12);
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((i) => parseISO(i.date).getHours() >= 12);
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((i) => isAfter(parseISO(i.date), new Date()));
  }, [appointments]);

  return (
    <>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber Logo" />

          <Profile>
            <Avatar src={user.avatar_url} />

            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            {isToday(selectedDay) && <span>Hoje</span>}
            <span>{WeekDay}</span>
            <span>{DayName}</span>
          </p>

          {isToday(selectedDay) && nextAppointment && (
            <>
              <h2>Atendimento a seguir</h2>

              <NextAppointment>
                <img
                  src="https://avatars0.githubusercontent.com/u/22337112?s=460&u=d452e883b12586837144b313d82a80f649d7207c&v=4"
                  alt="Diego"
                />

                <p>Diego Hennrich</p>

                <span>
                  <FiClock />
                  08:00
                </span>
              </NextAppointment>
            </>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}
            {morningAppointments.map((i) => (
              <Appointment key={i.id}>
                <span>
                  <FiClock />
                  {i.dateFormatted}
                </span>

                <div>
                  <img
                    src={i.user.avatar_url || defaultImg}
                    alt={i.user.name}
                  />

                  <p>{i.user.name}</p>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>
            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento neste período.</p>
            )}
            {afternoonAppointments.map((i) => (
              <Appointment key={i.id}>
                <span>
                  <FiClock />
                  {i.dateFormatted}
                </span>

                <div>
                  <img
                    src={i.user.avatar_url || defaultImg}
                    alt={i.user.name}
                  />

                  <p>{i.user.name}</p>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']} // dias da semana
            fromMonth={new Date()} // apenas data atual pra frente
            disabledDays={[
              { daysOfWeek: [0, 6] }, // desabilitando domingo(0) e sábado(6)
              ...daysOff,
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }} // aplicando css nos dias úteis da semana
            onDayClick={handleDateChange}
            selectedDays={selectedDay}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </>
  );
};

export default Dashboard;
