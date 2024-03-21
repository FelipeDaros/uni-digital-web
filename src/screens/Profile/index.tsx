import {
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import { CustomButton } from "../../components/Button"
import { LabelText } from "../FormRegisterClient/components/StepTwo/style"
import { VTextField } from "../../components/Input/VTextField"
import { VSelect } from "../../components/Select/VSelect"
import { statesArray } from "../../utils/estados"
import { VModalConfirm } from "../../components/ModalConfirm"
import { useEffect, useRef, useState } from "react"
import { theme } from "../../styled"

import { Form } from "@unform/web"
import { FormHandles } from "@unform/core"
import { useNavigate } from "react-router-dom"
import { api } from "../../config/api"
import { useAuth } from "../../context/AuthContext"
import { Loading } from "../../components/Loading"
import { useToast } from "../../context/ToastContext"

export function Profile() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const navigation = useNavigate();
  const [isStateSignature, setIsStateSignature] = useState(false)
  const [isStateModalCancelSignature, setIsStateModalCancelSignature] = useState(false);
  const [loading, setLoading] = useState(false);
  const [radio, setRadio] = useState("");
  const formRef = useRef<FormHandles>(null)

  const handleStateSignature = () => setIsStateSignature(!isStateSignature)
  const handleStateCancelSignature = () => setIsStateModalCancelSignature(!isStateModalCancelSignature)


  async function handleSave(dados: any) {
    try {
      setLoading(true);
      const payload = {
        ...dados,
        sexo: radio
      }
      const { data } = await api.put(`/auth/update/${user?.user.id}`, payload);
      showToast({ color: 'success', message: data.message });
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleAlterSignature() {
    navigation('/signature')
    handleStateSignature()
  }

  async function handleCancelSignature() {

  }

  function setRadioValue(value: any) {
    setRadio(value);
    formRef.current?.setFieldValue("sexo", value);
  }

  async function fetchData() {
    try {
      setLoading(true)
      const { data } = await api.get(`/auth/show/${user?.user.id}`);

      formRef.current?.setFieldValue("nome", data.data.nome);
      formRef.current?.setFieldValue("data_nascimento", data.data.data_nascimento);
      formRef.current?.setFieldValue("documento", data.data.documento);
      formRef.current?.setFieldValue("sexo", data.data.sexo);
      formRef.current?.setFieldValue("fone", data.data.fone);
      formRef.current?.setFieldValue("celular", data.data.celular);
      formRef.current?.setFieldValue("email", data.data.email);
      formRef.current?.setFieldValue("cep", data.data.cep);
      formRef.current?.setFieldValue("endereco", data.data.endereco);
      formRef.current?.setFieldValue("numero", data.data.numero);
      formRef.current?.setFieldValue("bairro", data.data.bairro);
      formRef.current?.setFieldValue("cidade", data.data.cidade);
      formRef.current?.setFieldValue("uf", data.data.uf);

      setRadio(data.data.sexo);
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2}>
            <Typography fontWeight="bold" textAlign="start">
              Dados cadastrais
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LabelText>Nome</LabelText>
            <VTextField
              size="small"
              autoComplete="given-name"
              name="nome"
              required
              color="success"
              fullWidth
              id="nome"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Data nascimento</LabelText>
            <VTextField
              size="small"
              required
              id="data_nascimento"
              name="data_nascimento"
              placeholder="Data"
              fullWidth
              type="date"
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText>CPF/CNPJ</LabelText>
            <VTextField
              size="small"
              autoComplete="given-name"
              name="documento"
              required
              color="success"
              fullWidth
              id="documento"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Sexo</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={e => setRadioValue(e.target.value)}
              value={radio}
              id="sexo"
              name="sexo"
            >
              <FormControlLabel
                value="M"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Masculino"
              />
              <FormControlLabel
                value="F"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Feminino"
              />
              <FormControlLabel
                value="N"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Não informar"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid container spacing={2} component={Paper} pr={2} mt={2} pb={2}>
          <Grid p={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Contatos
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabelText>Fone</LabelText>
            <VTextField
              size="small"
              autoComplete="given-name"
              name="fone"
              required
              color="success"
              fullWidth
              id="fone"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabelText>Celular</LabelText>
            <VTextField
              size="small"
              name="celular"
              required
              color="success"
              fullWidth
              id="celular"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText>Email</LabelText>
            <VTextField
              size="small"
              name="email"
              required
              color="success"
              fullWidth
              id="email"
              autoFocus
              type="email"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} component={Paper} pr={2} mt={2} pb={2}>
          <Grid p={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Endereço
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>CEP</LabelText>
            <VTextField
              size="small"
              autoComplete="given-name"
              name="cep"
              required
              color="success"
              fullWidth
              id="cep"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>Endereço</LabelText>
            <VTextField
              size="small"
              name="endereco"
              required
              color="success"
              fullWidth
              id="endereco"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>Número</LabelText>
            <VTextField
              size="small"
              name="numero"
              required
              color="success"
              fullWidth
              id="numero"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>Bairro</LabelText>
            <VTextField
              size="small"
              name="bairro"
              required
              color="success"
              fullWidth
              id="bairro"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>Cidade</LabelText>
            <VTextField
              size="small"
              name="cidade"
              required
              color="success"
              fullWidth
              id="cidade"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LabelText>UF</LabelText>
            <VSelect
              type="text"
              required
              id="uf"
              name="uf"
              fullWidth
              color="success"
              variant="standard"
            >
              {statesArray.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </VSelect>
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
          <CustomButton type="submit" color="success" variant="contained">
            <Typography color="#fff">Salvar</Typography>
          </CustomButton>
          {user.user.tipo === "T" &&
            <>
              <CustomButton
                type="button"
                color="success"
                variant="contained"
                onClick={handleStateSignature}
              >
                <Typography color="#fff">Alterar Assinatura</Typography>
              </CustomButton>
              <CustomButton onClick={() => navigation('/change-payment-method')} type="button" color="success" variant="contained">
                <Typography color="#fff">Alterar forma pagamento</Typography>
              </CustomButton>
              <CustomButton onClick={() => handleStateCancelSignature()} type="button" color="error" variant="outlined">
                <Typography>Cancelar assinatura</Typography>
              </CustomButton>
            </>
          }
        </Grid>
      </Form>
      <VModalConfirm
        onOk={handleAlterSignature}
        changeState={handleStateSignature}
        isState={isStateSignature}
        description="Você deseja alterear a assinatura"
        title="Alterar assinatura"
      />
      <VModalConfirm
        onOk={handleCancelSignature}
        changeState={handleStateCancelSignature}
        isState={isStateModalCancelSignature}
        description="Para nos ajudar a melhorar, favor informar o motivo do cancelamento"
        title="Cancelamento UniDigital"
        titleOk="Confirmar Cancelamento"
      />
    </Container>
  )
}
