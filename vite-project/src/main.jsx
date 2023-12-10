import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Eventos from './pages/eventos/eventos.jsx';
import EventList from './pages/eventos/CardDeEvento.jsx';
import EventEdit from './pages/eventos/EditEventos.jsx';
import "./css/styleguide.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/eventos?" element={<Eventos />} />
        <Route path="/eventos/CardEventos" element={<EventList />} />
        <Route path="/eventos/EditEventos" element={<EventEdit />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
