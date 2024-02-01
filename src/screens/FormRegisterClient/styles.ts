import styled from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh; /* Opcional: ajusta a altura para a tela inteira */
  width: 100%;
  background-color: #F5F5F5;

  @media (max-width: 900px) {
    margin-top: 60px;
    margin-bottom: 80px;
  }
`;

export const ImgLogo = styled.img`
  width: auto;
  max-width: 250px; /* Defina um valor máximo desejado */
`;