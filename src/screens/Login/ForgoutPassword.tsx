import { Backdrop, Box, Button, CircularProgress, CssBaseline, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import logo from '../../assets/logo-unidigital-horizontal-amarelo.png';
import { ContainerBox, Image, StyledContainer } from './styles';
import { PermIdentity, VpnKey } from '@mui/icons-material';
import { useState } from 'react';
import { SucessToast } from '../../components/Toast/SucessToast';
import { CustomButton } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export function ForgoutPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSubmit = (event: any) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get('email')) {
      window.alert('Infome E-mail, CPF ou CNPJ');
      return
    }

    navigate('/send-forgout');
    setLoading(false);
  };

  return (
    <StyledContainer>
      <CssBaseline />
      <Image src={logo} />
      <ContainerBox>
        <SucessToast state={alert} />
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Typography fontWeight="bold" fontSize={22} marginBottom={4} color="#28DA9D" textAlign="center">Área do cliente</Typography>
          <Typography fontWeight="bold" fontSize={14} marginBottom={2} textAlign="center" color="GrayText">
            Informe seu e-mail, CPF ou CNPJ e você receberá instruções para recuperação de sua senha no seu e-mail cadastrado
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type='email'
            color="success"
            label="E-mail, CPF ou CNPJ"
            name="email"
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
          <Grid container justifyContent="center">
            <Grid item marginTop={2}>
              <CustomButton type='submit' size="large" variant="contained">
                <Typography fontSize={14} color="white" >
                  Recuperar Senha
                </Typography>
              </CustomButton>
            </Grid>
          </Grid>
        </Box>
      </ContainerBox>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </StyledContainer>
  )
}