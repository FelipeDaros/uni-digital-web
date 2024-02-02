import styled from "styled-components";

export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #F5F5F5;
  margin-bottom: 100px;
  padding-top: 20px;
  /* margin-top: 20px; */

  @media (max-width: 900px) {
    margin-bottom: 80px;
  }
`;

export const ImgLogo = styled.img`
  width: auto;
  max-width: 250px; /* Defina um valor máximo desejado */
`;