import styled from "styled-components"
import backgroundImage from "../../assets/background-desktop.png"
import backgroundImageMobile from "../../assets/background-mobile.png"
import { Grid } from "@mui/material"

export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  padding-bottom: 100px;
  padding-top: 20px;
`

export const ImgLogo = styled.img`
  width: auto;
  max-width: 250px; /* Defina um valor máximo desejado */
`

export const DivBackgroundColor = styled.div`
  background-color: #28da9d;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`


export const StyledContainerAwatingPayment = styled(Grid)`
  height: 100%;
  width: 100%;
  min-height: 100vh;

  @media (min-width: 900px) {
    background-image: url(${backgroundImage});
  }

  @media (max-width: 900px) {
    background-image: url(${backgroundImageMobile});
  }
`