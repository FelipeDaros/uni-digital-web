import { Avatar, Checkbox, Container, FormControlLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useState } from "react";

import * as XLSX from "xlsx"


import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { FormAlterSignatureStore } from "./store/FormAlterSignatureStore";
import { CustomButton } from "../../components/Button";
import { VisuallyHiddenInput } from "./styles";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { VTextField } from "../../components/Input/VTextField";
import { handleKeyPress } from "../../utils/handleKeyPress";
import { DependentForm } from "./DependentForm";
import { DependentTable } from "./DependentTable";
import { VSelect } from "../../components/Select/VSelect";
import { CreditCard } from "./CreditCard";


const TIPO_PAGAMENTO = ["PIX", "BOLETO", "CARTAO"]

type PropsXLSX = {
  nome: string
  documento: string
  email: string
  data_nascimento: string
  sexo: string
}

export function Signature() {
  const formRef = useRef<FormHandles>(null)
  const [avatar, setAvatar] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedSexo, setSelectedSexo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [handleSecundarios, secundarios, handleLoading] = FormAlterSignatureStore(
    (state) => [state.handleSecundarios, state.secundarios, state.handleLoading],
  )

  const handleAcceptTerms = () => setAcceptTerms(!acceptTerms);

  const handleChange = (event: any) => {
    setSelectedPayment(event.target.value as string);
  };

  function handleAvatarChange(e: any) {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      //@ts-ignore
      setAvatarFile(URL.createObjectURL(file))
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
      console.log(data)
      //@ts-ignore

      formRef.current?.setData({
        uf: data.uf,
        cidade: data.localidade,
      });

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

  async function handleSave(dados: any) {
    //@ts-ignore
    if (
      formRef.current?.getData()?.senha !==
      formRef.current?.getData()?.confirmarSenha
    ) {
      window.alert("Senhas não conferem")
    }

    const formData = new FormData()

    // Adiciona cada chave e valor do objeto 'dados' ao FormData
    Object.entries(dados).forEach(([key, value]) => {
      //@ts-ignore
      formData.append(key, value)
    })

    //@ts-ignore
    formData.append("secundarios", secundarios)
    formData.append("tipo_pagamento", selectedPayment)
    formData.append("sexo", selectedSexo)

    // Adiciona a foto ao FormData
    if (avatar) {
      formData.append("avatar", avatar) // 'avatar' é o nome do campo no FormData que conterá a foto
    }

    // Agora você pode acessar os valores do FormData
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container mt={2} spacing={2} component={Paper} p={2}>
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
        </Grid>
        <Grid mt={2}>
          <CustomButton type="submit" color="success" variant="contained">
            <Typography color="#fff">Alterar assinatura</Typography>
          </CustomButton>
        </Grid>
      </Form>
    </Container>
  )
}