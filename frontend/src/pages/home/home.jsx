import BotaoMenu from "./BotaoMenu";
import styled from "styled-components";
import { Link } from 'react-router-dom'; 




const StyledHome = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw; 
  height: 100vh; 
  position: relative;
  

  & .home {
    background-color: var(--background);
    width: 100%; 
    height: 100%; 
    position: absolute;
    top: 0;
    left: 0;
  }

  & .img {
    background-color: var(--elementos-de-destaque);
    position: absolute;
    top: 0;
    right: 0;
    width: 50%; // Se a imagem deve ocupar metade da largura da tela
    height: 100%; // Se a imagem deve ocupar toda a altura da .home
  }

  & .img-home {
    position: absolute;
    top: 50%; // Centralizar verticalmente
    left: 50%; // Centralizar horizontalmente
    transform: translate(-50%, -50%); // Ajustar a centralização
    max-width: 100%;
    max-height: 100%;
  }

  & .welcome {
    position: absolute;
    top: 170px;
    left: 122px;
    width: 392px;
    height: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }


  & .div {
    font-family: "Inter-ExtraBold", sans-serif;
    font-size: 40px;
    font-weight: 800;
    color: #000;
  }

  & .home-buttons {
    position: absolute;
    top: 338px;
    left: 122px;
    display: flex;
    flex-direction: column;
    gap: 16px; 
    color: #fff;
    justify-content: center;
  }


  & .logo {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 163px;
    height: 46px;
    object-fit: cover;
  }
`;

export const Home = () => {
  return (
    <StyledHome>
      <div className="home">
        <div className="img">
          <img className="img-home" alt="Img home" src="./src/assets/imghome.svg"/>
        </div>
        <div className="welcome">
          <div className="div">Bem-vindo!</div>
        </div>
        <div className="home-buttons">
        <Link to="/eventos">
            <BotaoMenu text="Crie seu evento" />
          </Link>
          <Link to="/eventos/CardEventos">
            <BotaoMenu text="Encontre eventos" />
          </Link>
          
        </div>
        <img className="logo" alt="Logo" src="./src/assets/logo.svg" />
      </div>
    </StyledHome>
  );
};

export default Home;