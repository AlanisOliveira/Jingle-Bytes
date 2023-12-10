import styled from "styled-components";
import PropTypes from "prop-types";
const StyledBotaoMenu = styled.div`
  background-color: var(--elementos-de-destaque);
  border-radius: 50px;
  height: 40px;
  position: relative;
  width: 351px;
  justify-content: center;

  & .text-wrapper {
  color: #fff;
  font-family: "Inter-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  left: 121px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 10px;
  white-space: nowrap;
  
}
`;

const BotaoMenu = ({ text }) => {
  return (
    <StyledBotaoMenu>
      <div className="text-wrapper">{text}</div>
    </StyledBotaoMenu>
  );
};

BotaoMenu.propTypes = {
  text: PropTypes.string.isRequired,
};
 


export default BotaoMenu;