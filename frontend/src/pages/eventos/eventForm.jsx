import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

const StyledForm = styled.form`
 display: flex;
 flex-direction: column;
 gap: 15px;
 background-color: #FFFFFF;
 padding: 30px;
 border-radius: 10px;

 input, select, textarea {
   padding: 10px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
   border-radius: 20px;
   font-size: 16px;
   
  
 }
 .datetime-wrapper {
  display: flex;
  gap: 15px;


  input[type="date"],
  input[type="time"] {
    flex: 1; 
  }

  input[type="time"] {
    flex-grow: 1; 
    margin-left: auto; 
  }
  
   

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

 .button-wrapper {
   display: flex;
   justify-content: center;
   border-radius: 10px;
 }

 button {
   background-color: var(--elementos-de-destaque);
   color: white;
   padding: 10px 20px;
   cursor: pointer;
   border-radius: 20px;
 }
`;

export const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    category_id: '',
    place_id: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndPlaces = async () => {
      try {
        
        const categoryResponse = await axios.get('http://localhost:42069/category/all');
        const placeResponse = await axios.get('http://localhost:42069/place/all');
        setCategories(categoryResponse.data);
        setPlaces(placeResponse.data);
      } catch (error) {
        console.error('Erro ao buscar categorias e locais:', error);
      }
    };

    fetchCategoriesAndPlaces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        name: formData.name,
        date: `${formData.date}T${formData.time}`,
        description: formData.description,
        category_id: formData.category_id, 
        place_id: formData.place_id,       
      };
      const response = await axios.post('http://localhost:42069/event', postData);
      console.log('Evento cadastrado:', response.data);
      alert('Evento cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar evento:', error);
      
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome do evento"
      />
      <div className="datetime-wrapper">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <select name="category_id" value={formData.category_id} onChange={handleChange}>
        <option value="">Selecione a categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <select name="place_id" value={formData.place_id} onChange={handleChange}>
        <option value="">Selecione o local do evento</option>
        {places.map((place) => (
          <option key={place.id} value={place.id}>{place.name}</option>
        ))}
      </select>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição do evento"
        rows="4"
      ></textarea>
      <div className="button-wrapper">
        <button type="submit">Cadastrar Evento</button>
      </div>
    </StyledForm>
  );
};
