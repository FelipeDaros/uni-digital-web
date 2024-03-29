import {
  Backdrop,
  CircularProgress,
  CssBaseline,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material"
import logo from "../../assets/logo-unidigital-horizontal-amarelo.png"
import { ContainerBox, Image, StyledContainer } from "./styles"
import { PermIdentity } from "@mui/icons-material"
import { useRef, useState } from "react"
import { CustomButton } from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { Form } from "@unform/web"
import { FormHandles } from "@unform/core"
import { api } from "../../config/api"
import { VTextField } from "../../components/Input/VTextField"
import { useToast } from "../../context/ToastContext"

export function ForgoutPassword() {
  const { showToast } = useToast();
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      await api.post(`/auth/forgout-password`, data);
      navigate("/send-forgout")
      showToast({
        message: 'Recuperação enviada!',
        color: 'success'
      })
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          message: error.response.data.message,
          color: 'error'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledContainer>
      <CssBaseline />
      <Image src={logo} />
      <ContainerBox>
        <Form placeholder="form" ref={formRef} onSubmit={handleSubmit}>
          <Typography
            fontWeight="bold"
            fontSize={22}
            marginBottom={4}
            color="#28DA9D"
            textAlign="center"
          >
            Área do cliente
          </Typography>
          <Typography
            fontWeight="bold"
            fontSize={14}
            marginBottom={2}
            textAlign="center"
            color="GrayText"
          >
            Informe seu e-mail, CPF ou CNPJ e você receberá instruções para
            recuperação de sua senha no seu e-mail cadastrado
          </Typography>
          <VTextField
            margin="normal"
            required
            fullWidth
            id="usuario"
            type="text"
            color="success"
            label="E-mail, CPF ou CNPJ"
            name="usuario"
            autoComplete="usuario"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <PermIdentity />
                </InputAdornment>
              ),
            }}
          />
          <Grid container justifyContent="center">
            <Grid item marginTop={2}>
              <CustomButton
                type="submit"
                color="success"
                size="large"
                variant="contained"
              >
                <Typography fontSize={14} color="white">
                  Recuperar Senha
                </Typography>
              </CustomButton>
            </Grid>
          </Grid>
        </Form>
      </ContainerBox>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </StyledContainer>
  )
}
