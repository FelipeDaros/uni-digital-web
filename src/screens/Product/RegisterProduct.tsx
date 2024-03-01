import { FormHandles } from "@unform/core"
import { useRef, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Container, Grid, Paper, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { VTextField } from "../../components/Input/VTextField";
import { theme } from "../../styled";
import { Loading } from "../../components/Loading";
import { Form } from "@unform/web";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { handleKeyPress } from "../../utils/handleKeyPress";
import { useToast } from "../../context/ToastContext";


export function RegisterProduct() {
  const { showToast } = useToast()
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("");
  const [secundarios, setSecunarios] = useState(0);


  async function handleSave(dados: any) {
    try {
      setLoading(true);
      const payload = {
        ...dados,
        tipo: tipo,
        add_secundarios: secundarios
      }
      const { data } = await api.post('/produtos/store', payload);
      showToast({
        color: 'success',
        message: data.message
      })
      navigate('/products');
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'success',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false);
    }
  }

  function setTipoValue(value: any) {
    setTipo(value);
    formRef.current?.setFieldValue("tipo", value);
  }

  function handleSecundarios(value: any) {
    setSecunarios(value);
    formRef.current?.setFieldValue("add_secundarios", value);
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2}>
            <Typography fontWeight="bold" textAlign="start">
              Produto
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
            <LabelText htmlFor="">Descrição</LabelText>
            <VTextField
              size="small"
              autoComplete="given-descricao"
              name="descricao"
              required
              color="success"
              fullWidth
              id="descricao"
              inputProps={{ maxLength: 255 }}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText>Observação</LabelText>
            <VTextField
              size="small"
              autoComplete="given-observacao"
              name="observacao"
              required
              color="success"
              fullWidth
              id="observacao"
              inputProps={{ maxLength: 255 }}
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText>Preço</LabelText>
            <VTextField
              size="small"
              autoComplete="given-preco"
              name="preco"
              required
              color="success"
              fullWidth
              id="preco"
              inputProps={{ maxLength: 22 }}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText>Quantidade de secundarios padrão</LabelText>
            <VTextField
              size="small"
              autoComplete="given-qtd-secundario-padrao"
              name="qtd_secundario_padrao"
              required
              color="success"
              fullWidth
              id="qtd_secundario_padrao"
              inputProps={{ maxLength: 6 }}
              type="text"
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Adicionar secundários</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={e => handleSecundarios(e.target.value)}
              value={secundarios}
              id="secundario"
              name="secundario"
            >
              <FormControlLabel
                value="1"
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
                label="Sim"
              />
              <FormControlLabel
                value="0"
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
                label="Não"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Tipo</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={e => setTipoValue(e.target.value)}
              value={tipo}
              id="tipo"
              name="tipo"
            >
              <FormControlLabel
                value="PF"
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
                label="Pessoa física"
              />
              <FormControlLabel
                value="PJ"
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
                label="Pessoa jurídica"
              />
            </RadioGroup>
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
