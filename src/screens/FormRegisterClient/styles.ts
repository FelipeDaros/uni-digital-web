import styled from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh; /* Opcional: ajusta a altura para a tela inteira */
  width: 100%;

  @media (max-width: 900px) {
    margin-top: 60px;
    margin-bottom: 80px;
  }
`;

export const ContainerSubscription = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ImgLogo = styled.img`
  width: auto;
  max-width: 250px; /* Defina um valor máximo desejado */
`;

export const ContainerText = styled.div`
  margin-top: 10px;
  width: 80%;
  background-color: #28DA9D;
  height: 30px;
  border-radius: 6px;
  display: flex;
  padding: 6px;
  align-items: center;
`;

export const ContainerCupom = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  flex-direction: row;
  
  @media (max-width: 900px) {
    width: 80%;
    flex-direction: column;
  }
`

export const ContainerFooter = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end; /* Correção aqui */
  flex-direction: column; /* Adição aqui */
  margin-top: 10px;

  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
  }
`;
