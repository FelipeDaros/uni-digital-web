import { FormHandles } from "@unform/core"
import { useRef, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Container, MenuItem, Grid, Paper, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { VTextField } from "../../components/Input/VTextField";
import { theme } from "../../styled";
import { Loading } from "../../components/Loading";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { VSelect } from "../../components/Select/VSelect";
import { statesArray } from "../../utils/estados";
import { handleKeyPress } from "../../utils/handleKeyPress";
import { useToast } from "../../context/ToastContext";


export function RegisterAdminister() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false);
  const [radio, setRadio] = useState("");


  async function handleSave(dados: any) {
    try {
      setLoading(true);
      const payload = {
        ...dados,
        sexo: radio
      }
      await api.post('/auth/create-admin', payload);
      showToast({ message: 'Política cadastrada com sucesso!', color: 'success' })
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          message: error.response.data.message, color: 'error'
        })
      }
    } finally {
      setLoading(false);
    }
  }

  function setRadioValue(value: any) {
    setRadio(value);
    formRef.current?.setFieldValue("sexo", value);
  }

  async function handleAlterCep() {
    try {
      setLoading(true);
      //@ts-ignore
      const cep = formRef.current?.getData()?.cep


      if (!cep) {
        return;
      }

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
      })
      const data = await response.json()

      //@ts-ignore
      formRef.current.setFieldValue("uf", data.uf)
      formRef.current.setFieldValue("cidade", data.localidade)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

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
              inputProps={{ maxLength: 11 }}
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
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Fone</LabelText>
            </Grid>
            <VTextField
              id="fone"
              name="fone"
              size="small"
              autoComplete="given-fone"
              required
              color="success"
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Celular</LabelText>
            </Grid>
            <VTextField
              id="celular"
              name="celular"
              size="small"
              autoComplete="given-celular"
              required
              color="success"
              inputProps={{ maxLength: 11 }}
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
              inputProps={{ maxLength: 40 }}
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
              onBlur={handleAlterCep}
              onKeyPress={handleKeyPress}
              inputProps={{ maxLength: 8 }}
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
          <CustomButton onClick={() => navigate('/administers')} type="button" color="error" variant="outlined">
            <Typography>Cancelar</Typography>
          </CustomButton>
        </Grid>
      </Form>
    </Container>
  )
}
