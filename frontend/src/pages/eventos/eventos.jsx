import styled from "styled-components";
import { EventForm } from './eventForm';

const StyledEvento = styled.div`

  margin: 0;
  padding: 0;
  width: 100vw; 
  height: 100vh; 
  position: relative;
  overflow: hidden;

  & .cadastrodeEventos {
    background-color: var(--background);
    width: 100%; 
    height: 100%; 
    position: absolute;
    top: 0;
    left: 0;
  }

  & .overlap {
    background-image: url(./background.svg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    & .footer-instance {
      bottom: 0;
      width: 100%;
      position: absolute;
    }

      & .logo {
        height: 46px;
        margin-left: 25px;
        object-fit: cover;
        position: absolute;
        top: 17px; // Centrally aligned vertically in the header
        width: 163px;
      }
    }

    & .overlap-group {
      width: 358px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      & .horrios {
        position: relative;
        width: 100%;
        height: auto;

        & .send-button {
          position: absolute;
          bottom: 0;
          width: 100%;
          
          & .criar-wrapper {
            background-color: var(--elementos-de-destaque);
            border-radius: 50px;
            height: 39px;
            width: 100%;
            position: relative;

            & .criar {
              color: #bcabab;
              font-family: "Inter-SemiBold", Helvetica;
              font-size: 12px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }

        & .div {
          position: absolute;
          width: 100%;
          height: auto;
        }
      }

      & .seleo-de-local {
        position: absolute;
        top: calc(100% + 10px); // Offset by 10px from the bottom of horrios
        width: 100%;
      }

      & .seleo-de-categoria {
        position: absolute;
        top: calc(100% + 20px); 
        width: 100%;
      }
    }

    & .cadastro-de-eventos {
      font-family: "Inter-Bold", Helvetica;
      font-size: 3vw;
      font-weight: bold;
      text-align: center;
      color: var(--elementos-secundrios);
      width: auto;
      margin-top: 3rem;
    }
  }
`


const Evento = () => {
  return (
    <StyledEvento>
      <div className="cadastro-evento">
        <div className="overlap">
          <header className="header">
            <img className="logo" alt="Logo" src="./src/assets/logo.svg" />
          </header>
          <div className="overlap-group">
            <EventForm /> {/* Inserindo o componente de formulário */}
          </div>
          <div className="cadastro-de-eventos">CADASTRO DE EVENTOS</div>
        </div>
      </div>
    </StyledEvento>
  );
};

export default Evento;
