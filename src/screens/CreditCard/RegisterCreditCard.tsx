import { FormHandles } from "@unform/core"
import { useRef, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { VTextField } from "../../components/Input/VTextField";
import { theme } from "../../styled";
import { Loading } from "../../components/Loading";
import { Form } from "@unform/web";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../config/api";
import { useToast } from "../../context/ToastContext";
import { handleKeyPress } from "../../utils/handleKeyPress";
import { StorePermissions } from "../../store/StorePermissions";

export function RegisterCreditCard() {
  const [permissions] = StorePermissions((state) => [state.permissions]);

  const { showToast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false);

  async function handleSave(dados: any) {
    try {
      setLoading(true);
      await api.post('/pagamentos/add-cartao', dados);
      showToast({
        color: 'success',
        message: 'Cartão cadastrado com sucesso!'
      })
      navigate('/credit-card');
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          message: error.response.data.message,
          color: "error"
        })
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2}>
            <Typography fontWeight="bold" textAlign="start">
              Informe os dados do cartão abaixo
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Nome titular</LabelText>
            <VTextField
              id="nomeTitular"
              name="nomeTitular"
              size="small"
              autoComplete="given-descricao"
              required
              color="success"
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelText htmlFor="">Número</LabelText>
            <VTextField
              id="numero"
              name="numero"
              size="small"
              autoComplete="given-numero"
              required
              color="success"
              fullWidth
              inputProps={{ maxLength: 16 }}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={2}>
            <LabelText htmlFor="">CVV</LabelText>
            <VTextField
              id="cvv"
              name="cvv"
              size="small"
              autoComplete="given-cvv"
              required
              color="success"
              fullWidth
              inputProps={{ maxLength: 3 }}
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={4}>
            <LabelText htmlFor="">Vencimento</LabelText>
            <VTextField
              required
              size="small"
              id="dataVencimento"
              name="dataVencimento"
              fullWidth
              color="success"
              variant="standard"
              type="date"
            />
          </Grid>
        </Grid>
        <Grid
          direction="row"
          display="flex"
          gap={1}
          marginTop={2}
          container
          sx={{
            [theme.breakpoints.down("md")]: {
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            },
          }}
        >
          <CustomButton type="submit" color="success" variant="contained" disabled={!permissions.cartaoCredito.find(item => item.tipo === "CRIAR")}>
            <Typography color="#fff">Salvar</Typography>
          </CustomButton>
          <CustomButton onClick={() => navigate('/credit-card')} type="button" color="error" variant="outlined">
            <Typography>Voltar</Typography>
          </CustomButton>
        </Grid>
      </Form>
    </Container>
  )
}
