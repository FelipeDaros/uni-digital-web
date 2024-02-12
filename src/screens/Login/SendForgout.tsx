import {
  CircularProgress,
  CssBaseline,
  LinearProgress,
  Typography,
} from "@mui/material"
import logo from "../../assets/logo-unidigital-horizontal-amarelo.png"
import { ContainerBox, Image, StyledContainer } from "./styles"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function SendForgout() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [history])

  return (
    <StyledContainer>
      <CssBaseline />
      <Image src={logo} />
      <ContainerBox>
        <Typography
          fontWeight="bold"
          color="GrayText"
          fontSize={14}
          textAlign="center"
        >
          Um e-mail foi enviado para u***********@*******.com o link para que
          você mude a sua senha.
        </Typography>
        <Typography
          fontWeight="bold"
          color="GrayText"
          fontSize={14}
          textAlign="center"
        >
          Siga as instruções para reativar sua senha!
        </Typography>
        <CircularProgress color="success" sx={{ marginTop: 2 }} />
      </ContainerBox>
    </StyledContainer>
  )
}
