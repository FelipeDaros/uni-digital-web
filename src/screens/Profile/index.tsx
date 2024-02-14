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

export function Profile() {
  const navigation = useNavigate();
  const [isStateSignature, setIsStateSignature] = useState(false)
  const [isStateModalCancelSignature, setIsStateModalCancelSignature] = useState(false);
  const formRef = useRef<FormHandles>(null)

  const handleStateSignature = () => setIsStateSignature(!isStateSignature)
  const handleStateCancelSignature = () => setIsStateModalCancelSignature(!isStateModalCancelSignature)


  function handleSave(dados: any) {
    console.log(dados)
  }

  async function handleAlterSignature() {
    handleStateSignature()
  }

  async function handleCancelSignature(){

  }

  function fetchData() {
    formRef.current?.setData({
      firstName: "felipe",
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
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
              name="firstName"
              required
              color="success"
              fullWidth
              id="firstName"
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
              name="cnpj"
              required
              color="success"
              fullWidth
              id="cnpj"
              autoFocus
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Sexo</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="N"
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
