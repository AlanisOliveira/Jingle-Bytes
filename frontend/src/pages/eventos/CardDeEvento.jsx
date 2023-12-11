import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logoSrc from '../../assets/logo.svg';

const EventCard = styled.div`
  background-color: #000D08;
  color: #fff; 
  margin: 10px 0;
  width: 750px;
  height: 165px;
  padding: 20px;
  border-radius: 8px;
  border: 1px black solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EventListContainer = styled.div`
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventName = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const EventDetails = styled.p`
  margin: 5px 0;
`;

const EventDescription = styled.div`
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
`;

const SearchInput = styled.input`
  padding: 15px;
  width: 300px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FilterSelect = styled.select`
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Logo = styled.img`
  height: 46px;
  margin-left: 25px;
  object-fit: cover;
  position: absolute;
  top: 17px;
  width: 163px;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  text-align: center;
  color: #2C5234;
  font-size: 40px;
`;

const EventEdit = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:42069/event/all');
        const eventsWithNames = await Promise.all(response.data.map(async event => {
          let categoryName = '';
          let placeName = '';

          try {
            const categoryResponse = await axios.get(`http://localhost:42069/category/${event.category_id}`);
            categoryName = categoryResponse.data.name;
          } catch (error) {
            console.error("Erro ao buscar nome da categoria:", error);
          }

          try {
            const placeResponse = await axios.get(`http://localhost:42069/place/${event.place_id}`);
            placeName = placeResponse.data.name;
          } catch (error) {
            console.error("Erro ao buscar nome do local:", error);
          }
          return { ...event, categoryName, placeName };
        }));

        setEvents(eventsWithNames);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  return (
    <div>
      <Logo alt='Logo' src={logoSrc} />;
      <Title>EVENTOS</Title>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Pesquisar eventos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Categorias</option>
          {/* Opções de categorias aqui */}
        </FilterSelect>
        <FilterSelect value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
          <option value="">Datas</option>
          {/* Opções de datas aqui */}
        </FilterSelect>
      </SearchWrapper>
      <EventListContainer>
        {events.map(event => (
          <EventCard key={event.id}>
            <EventInfo>
              <EventName>{event.name}</EventName>
              <EventDetails>Data: {formatDate(event.date)}</EventDetails>
              <EventDetails>Horário: {formatTime(event.date)}</EventDetails>
            </EventInfo>
            <EventDescription>
              Descrição do evento: {event.description}
            </EventDescription>
          </EventCard>
        ))}
      </EventListContainer>
    </div>
  );
};

export default EventEdit;