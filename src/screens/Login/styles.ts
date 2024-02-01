import styled from "styled-components";
import backgroundImage from "../../assets/background-desktop.png";
import backgroundImageMobile from "../../assets/background-mobile.png";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  
  @media (min-width: 900px) {
    background-image: url(${backgroundImage});
  }

  @media (max-width: 900px) {
    background-image: url(${backgroundImageMobile});
  }
`;

export const ContainerBox = styled.div`
  margin-top: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 350px;
  border-radius: 10px;
  padding: 40px;

  @media (min-width: 900px) {
    width: 800px;
    padding: 20px;
    width: 400px;
  }
`;


export const Image = styled.img`
  margin-top: 40px;
  width: 250px;
`;
