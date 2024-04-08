import { Grid, MenuItem, Typography } from "@mui/material"
import { VSelect } from "../../components/Select/VSelect"
import { Form } from "@unform/web"
import { LabelText } from "../FormRegisterClient/components/StepTwo/style"
import { useEffect, useRef, useState } from "react"
import { FormHandles } from "@unform/core"
import { CustomButton } from "../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../config/api"
import { VTextField } from "../../components/Input/VTextField"
import { useToast } from "../../context/ToastContext"
import { theme } from "../../styled"
import { Loading } from "../../components/Loading"

const TIPO_PAGAMENTO = ["PIX", "BOLETO", "CARTAO"];

export function ChangePaymentMethod() {
  const { showToast } = useToast();

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const formRef = useRef<FormHandles>(null)

  async function handleSave(dados: any) {
    try {
      setLoading(true);

      const payload = {
        ...dados,
        id_usuario: id,

      }

      const { data } = await api.post('/pagamentos/mudanca-metodo', payload);
      showToast({
        color: 'success',
        message: data.data.message
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

  const handleChange = (event: any) => {
    setSelectedPayment(event.target.value as string);
    formRef.current?.setFieldValue("tipo", event.target.value);
  };

  async function fetchData() {
    const { data } = await api.get('pagamentos/metodo-atual', {
      params: {
        id_usuario: id
      }
    });

    setSelectedPayment(data.data.tipo)
    formRef.current?.setFieldValue("tipo", data.data.tipo);

    if (data.data.tipo === "CARTAO") {
      formRef.current?.setFieldValue("nomeTitular", data.data.nome_titular);
      formRef.current?.setFieldValue("numero", data.data.numero);
      formRef.current?.setFieldValue("dataVencimento", data.data.data_vencimento);
      formRef.current?.setFieldValue("cvv", data.data.cvv);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid pt={4} pb={4}>
      <Loading isLoading={loading}/>
      <Form
        placeholder="Alteração pagamento"
        ref={formRef}
        onSubmit={handleSave}
      >
        <Grid p={2} container>
          <Typography fontWeight="bold" textAlign="start">
            Alterar sua forma de pagamento
          </Typography>
        </Grid>
        <Grid p={2} container>
          <Typography textAlign="start">
            Escolha sua forma de pagamento preferida. Essa alteração irá
            impactar na próxima fatura
          </Typography>
        </Grid>
        <Grid p={2} display="flex" direction="column">
          <LabelText>Atual</LabelText>
          {/* @ts-ignore */}
          <VSelect
            type="text"
            required
            size="small"
            id="tipo"
            name="tipo"
            color="success"
            variant="standard"
            onChange={handleChange}
            value={selectedPayment}
            sx={{ width: 200 }}
          >
            {TIPO_PAGAMENTO.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </VSelect>
          {selectedPayment === "PIX" && (
            <p>
              A chave de pagamento PIX irá gerar assim que for emitido a fatura por nossos sistemas
            </p>
          )}
        </Grid>
        {selectedPayment === "CARTAO" && (
          <Grid p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Grid>
                  <LabelText>Nome titular</LabelText>
                </Grid>
                <VTextField
                  required
                  size="small"
                  id="nomeTitular"
                  name="nomeTitular"
                  fullWidth
                  color="success"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid>
                  <LabelText>Número</LabelText>
                </Grid>
                <VTextField
                  required
                  size="small"
                  id="numero"
                  name="numero"
                  fullWidth
                  color="success"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Grid>
                  <LabelText>Vencimento</LabelText>
                </Grid>
                <VTextField
                  required
                  size="small"
                  id="dataVencimento"
                  name="dataVencimento"
                  type="date"
                  fullWidth
                  color="success"
                  variant="standard"
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>
              <Grid item xs={4} md={1}>
                <Grid>
                  <LabelText>CVV</LabelText>
                </Grid>
                <VTextField
                  required
                  size="small"
                  id="cvv"
                  name="cvv"
                  fullWidth
                  color="success"
                  variant="standard"
                  inputProps={{ maxLength: 3 }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          direction="row"
          display="flex"
          container
          gap={1}
          p={2}
          sx={{
            [theme.breakpoints.down("md")]: {
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            },
          }}>
          <CustomButton type="submit" color="success" variant="contained">
            <Typography color="#fff">Salvar</Typography>
          </CustomButton>
          <CustomButton type="button" variant="text" color="success" onClick={() => navigate(`/signature/${id}`)}>
            Alterar assinatura
          </CustomButton>
        </Grid>
      </Form>
    </Grid>
  )
}
