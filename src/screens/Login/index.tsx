import { Box, Button, CssBaseline, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import logo from '../../assets/logo-unidigital-horizontal-amarelo.png';
import { ContainerBox, Image, StyledContainer } from './styles';
import { PermIdentity, VpnKey } from '@mui/icons-material';
import { useState } from 'react';
import { SucessToast } from '../../components/Toast/SucessToast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [alert, setAlert] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('user')) {
      setAlert(true);
      setTimeout(() => { setAlert(false) }, 3000);
    }
    
    //@ts-ignore
    signIn(data.get('user'), data.get('password'));

  };


  return (
    <StyledContainer>
      <CssBaseline />
      <Image src={logo} />
      <ContainerBox>
        <SucessToast state={alert} />
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Typography fontWeight="bold" fontSize={22} marginBottom={6} color="#28DA9D" textAlign="center">Área do cliente</Typography>
          <TextField
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
          <TextField
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
              <IconButton onClick={() => navigate('/forgout')}>
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
                color='success'
                sx={{ mt: 3, mb: 2, borderRadius: 2 }}
              >
                <Typography textAlign="center" color="white">Entrar</Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ContainerBox>
    </StyledContainer>
  )
}