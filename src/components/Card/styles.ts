import styled from 'styled-components';

export const CardContainer = styled.a`
  width: 200px;
  max-width: 200px;
  height: 100px;
  max-height: 100px;
  background-color: #28DA9D;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 6px;
  flex-direction: column;
  border-radius: 6px;
  transition: transform 0.3s ease-in-out; /* Adiciona uma transição suave ao transform */
  padding: 5px;

  &:hover{
    cursor: pointer; /* Muda o cursor para indicar que o elemento é clicável */
    opacity: 0.9;
  }
`;
