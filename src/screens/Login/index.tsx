import {
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material"
import logo from "../../assets/logo-unidigital-horizontal-amarelo.png"
import { ContainerBox, Image, StyledContainer } from "./styles"
import { PermIdentity, VpnKey } from "@mui/icons-material"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ErrorToast } from "../../components/Toast/ErrorToast"
import { Form } from "@unform/web"
import { FormHandles } from "@unform/core"
import { VTextField } from "../../components/Input/VTextField"
import { Loading } from "../../components/Loading"

export function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()


  const handleSubmit = (data: any) => {
    try {
      setLoading(true)
      signIn(data.user, data.password);
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledContainer>
      <Loading isLoading={loading} />
      <CssBaseline />
      <Image src={logo} />
      <ContainerBox>
        <Form placeholder="form" ref={formRef} onSubmit={handleSubmit}>
          <Typography
            fontWeight="bold"
            fontSize={22}
            marginBottom={6}
            color="#28DA9D"
            textAlign="center"
          >
            Área do cliente
          </Typography>
          <VTextField
            margin="normal"
            required
            fullWidth
            id="user"
            color="success"
            label="E-mail, CPF ou CNPJ"
            name="user"
            autoComplete="email"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <PermIdentity />
                </InputAdornment>
              ),
            }}
          />
          <VTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            color="success"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <VpnKey />
                </InputAdornment>
              ),
            }}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <IconButton onClick={() => navigate("/forgout")}>
                <Typography color="GrayText">Esqueci a senha</Typography>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
              >
                <Typography textAlign="center" color="white">
                  Entrar
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Form>
      </ContainerBox>
    </StyledContainer>
  )
}
