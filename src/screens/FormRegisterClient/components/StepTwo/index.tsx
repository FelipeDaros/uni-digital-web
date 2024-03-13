import { Avatar, Checkbox, Container, FormControlLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";

import * as XLSX from "xlsx"


import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { CustomButton } from "../../../../components/Button";
import { LabelText, VisuallyHiddenInput } from "../StepTwo/style";
import { VTextField } from "../../../../components/Input/VTextField";
import { DependentForm } from "../StepTwo/DependentForm";
import { DependentTable } from "../StepTwo/DependentTable";
import { VSelect } from "../../../../components/Select/VSelect";
import { CreditCard } from "../CreditCard";
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore";
import { handleKeyPress } from "../../../../utils/handleKeyPress";
import { api } from "../../../../config/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../context/ToastContext";

const TIPO_PAGAMENTO = ["PIX", "BOLETO", "CARTAO"]

type PropsXLSX = {
  nome: string
  documento: string
  email: string
  data_nascimento: string
  sexo: string
}

export function StepTwo() {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null)
  const [avatar, setAvatar] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedSexo, setSelectedSexo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { showToast } = useToast();

  const [handleSecundarios, secundarios, handleLoading, product, total, totalDependets, cartao] = FormRegisterClientStore(
    (state) => [state.handleSecundarios, state.secundarios, state.handleLoading, state.product, state.total, state.totalDependets, state.cartao],
  )

  async function handleSave(dados: any) {
    if (
      dados.password !==
      dados.confirmpassword
    ) {
      showToast({
        color: 'warning',
        message: "As senhas não conferem"
      })
      return
    }

    if(!acceptTerms){
      showToast({
        color: 'warning',
        message: "É necessário aceitar os termos."
      })
      return
    }

    try {
      handleLoading()
      const formData = {
        ...dados,
        secundarios,
        qtd_secundario: secundarios.length,
        total,
        id_produto: product.id,
        sexo: selectedSexo,
        tipo_pagamento: selectedPayment,
        foto: avatarFile,
        cartao: cartao ?? null
      }
      
      await api.post(`/compras/store`, formData);

      if(selectedPayment === "P" || selectedPayment === "B"){
        return navigate(`/awaiting-payment/${selectedPayment}`);
      }

      return navigate('/');
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      handleLoading()
    }
  }

  const handleAcceptTerms = () => setAcceptTerms(!acceptTerms);

  const handleChange = (event: any) => {
    setSelectedPayment(event.target.value as string);
  };

  function handleAvatarChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file))
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        const base64String = reader.result?.split(',')[1]; // Remove o cabeçalho da string base64
        setAvatarFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleAlterCep() {
    try {
      handleLoading();
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
      handleLoading();
    }
  }

  function importXLS(data: any) {
    const reader = new FileReader()
    reader.readAsBinaryString(data.target.files[0])
    reader.onload = (e: any) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData: PropsXLSX[] = XLSX.utils.sheet_to_json(sheet)

      if (parsedData.length > totalDependets) {
        showToast({
          color: 'error',
          message: "A quantidade de dependetes na planilha é maior do que a informado no inicío da operação"
        })
        return
      }

      parsedData.forEach((item) => {
        handleSecundarios({
          dataNascimento: item.data_nascimento,
          documento: item.documento,
          email: item.email,
          nome: item.nome,
          sexo: item.sexo,
        })
      })
    }
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Grid p={2} container justifyContent="center">
        <Typography textAlign="center">
          O titular é a pessoa responsável pelo aceite do contrato e pelo pagamento das mensalidades da Telemedicina Unimed.
        </Typography>
      </Grid>
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container spacing={2} component={Paper} pr={2} pb={2}>
          <Grid item xs={12} sm={12}>
            <Avatar
              sx={{ width: 62, height: 62 }}
              alt="Remy Sharp"
              src={avatar ?? ""}
            />
            <CustomButton
              size="small"
              sx={{ marginTop: 4 }}
              component="label"
              variant="contained"
              color="success"
              startIcon={<CloudUploadIcon color="primary" />}
            >
              <Typography color="white">Enviar</Typography>
              <VisuallyHiddenInput
                type="file"
                accept=".png, .jpg, .jpeg"
                multiple={false}
                onChange={handleAvatarChange}
              />
            </CustomButton>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Nome</LabelText>
            </Grid>
            <VTextField
              id="nome"
              name="nome"
              size="small"
              autoComplete="given-name"
              required
              color="success"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Documento (CPF/CNPJ)</LabelText>
            </Grid>
            <VTextField
              onKeyPress={handleKeyPress}
              id="documento"
              name="documento"
              size="small"
              autoComplete="given-documento"
              required
              color="success"
              type="text"
              inputProps={{ maxLength: 11 }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <Grid>
              <LabelText>Data nascimento</LabelText>
            </Grid>
            <VTextField
              id="dataNascimento"
              name="dataNascimento"
              size="small"
              placeholder="Data nascimento"
              autoComplete="given-datanascimento"
              required
              color="success"
              type="date"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid>
              <LabelText htmlFor="">Sexo</LabelText>
            </Grid>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="N"
              id="sexo"
              name="sexo"
              onChange={e => setSelectedSexo(e.target.value)}
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
        <Grid container mt={2} spacing={2} component={Paper} pr={2} pb={2}>
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
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Email</LabelText>
            </Grid>
            <VTextField
              id="email"
              name="email"
              size="small"
              autoComplete="given-email"
              required
              color="success"
              type="email"
              inputProps={{ maxLength: 40 }}
            />
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Endereço
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>CEP</LabelText>
            </Grid>
            <VTextField
              id="cep"
              name="cep"
              size="small"
              autoComplete="given-cep"
              required
              color="success"
              onBlur={handleAlterCep}
              helperText="Somente números"
              onKeyPress={handleKeyPress}
              inputProps={{ maxLength: 8 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Endereço</LabelText>
            </Grid>
            <VTextField
              id="endereco"
              name="endereco"
              size="small"
              autoComplete="given-endereco"
              required
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Número</LabelText>
            </Grid>
            <VTextField
              id="numero"
              name="numero"
              size="small"
              autoComplete="given-numero"
              required
              color="success"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Bairro</LabelText>
            </Grid>
            <VTextField
              id="bairro"
              name="bairro"
              size="small"
              autoComplete="given-name"
              required
              color="success"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Cidade</LabelText>
            </Grid>
            <VTextField
              id="cidade"
              name="cidade"
              size="small"
              autoComplete="cidade"
              required
              color="success"
              type="text"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>UF</LabelText>
            </Grid>
            <VTextField
              id="uf"
              name="uf"
              size="small"
              autoComplete="given-uf"
              required
              color="success"
              type="text"
              disabled
            />
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Senha
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Senha</LabelText>
            </Grid>
            <VTextField
              id="password"
              name="password"
              size="small"
              autoComplete="given-password"
              required
              color="success"
              type="password"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid>
              <LabelText>Confirmar senha</LabelText>
            </Grid>
            <VTextField
              id="confirmpassword"
              name="confirmpassword"
              size="small"
              autoComplete="given-confirmpassword"
              required
              color="success"
              type="password"
            />
          </Grid>
        </Grid>
        {product.add_secundarios === 1 &&
          <Grid container mt={2} spacing={2} component={Paper} pr={2} pb={2}>
            <Grid p={2} container>
              <Typography fontWeight="bold" textAlign="start">
                Dependentes
              </Typography>
            </Grid>
            <DependentForm />
            <DependentTable />
            <Grid p={2} container>
              <CustomButton
                color="success"
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon color="primary" />}
              >
                <Typography color="white">Importar</Typography>
                <VisuallyHiddenInput
                  type="file"
                  accept=".xlsx, .xls, .ods"
                  multiple={false}
                  onChange={importXLS}
                />
              </CustomButton>
            </Grid>
          </Grid>
        }
        <Grid container mt={2} spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Pagamentos
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <VSelect
              type="text"
              required
              size="small"
              id="tipo_pagamento"
              name="tipo_pagamento"
              color="success"
              variant="standard"
              value={selectedPayment}
              onChange={handleChange}
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
                A chave de pagamento PIX irá gerar assim que for emitido a fatura
                por nossos sistemas
              </p>
            )}
            {selectedPayment === "CARTAO" && (
              <Grid p={2}>
                <CreditCard />
              </Grid>
            )}
          </Grid>
          <Grid p={2} mt={2} container>
            <Typography fontWeight="bold" textAlign="start">
              Os seus dados pessoais serão utilizados para processar a sua compra, apoiar a sua experiência em todo este site e para outros fins descritos na nossa Política de Privacidade.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox
                id="acceptTerms"
                name="acceptTerms"
                value={acceptTerms}
                onChange={() => handleAcceptTerms()}
                sx={{
                  color: "#28DA9D",
                  "&.Mui-checked": {
                    color: "#28DA9D",
                  },
                }}
              />} label="Aceito os termos contidos em contrato. Download do contrato (PDF)" />
          </Grid>
        </Grid>
        <Grid mt={2}>
          <CustomButton type="submit" color="success" variant="contained">
            <Typography color="#fff">Finalizar compra</Typography>
          </CustomButton>
        </Grid>
      </Form>
    </Container>
  )
}