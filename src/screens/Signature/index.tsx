import { Avatar, Checkbox, Container, FormControlLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";

import * as XLSX from "xlsx"


import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { FormAlterSignatureStore } from "./store/FormAlterSignatureStore";
import { CustomButton } from "../../components/Button";
import { VisuallyHiddenInput } from "./styles";
import { DependentForm } from "./DependentForm";
import { DependentTable } from "./DependentTable";
import { VSelect } from "../../components/Select/VSelect";
import { CreditCard } from "./CreditCard";
import { api } from "../../config/api";


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
  const [selectedPayment, setSelectedPayment] = useState("");

  const [stateModalError, setStateModalError] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState("");

  const [handleSecundarios, secundarios, handleLoading] = FormAlterSignatureStore(
    (state) => [state.handleSecundarios, state.secundarios, state.handleLoading],
  )

  const handleChange = (event: any) => {
    setSelectedPayment(event.target.value as string);
  };

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
    try {
      handleLoading()
      // const formData = {
      //   ...dados,
      //   secundarios,
      //   qtd_secundario: secundarios.length,
      //   total,
      //   id_produto: product.id,
      //   sexo: selectedSexo,
      //   tipo_pagamento: selectedPayment
      // }

      // await api.post(`/compras/store`, formData);
      
    } catch (error: any) {
      if (!!error.response) {
        // handleChangeStateModalErro()
        // setMsgErrorModal(error.response.data.message)
      }
    } finally {
      handleLoading()
    }
  }
  
  async function fetchData(){
    try {
      handleLoading()
      await api.get('/produtos/list');
    } catch (error) {
      
    }finally{
      handleLoading()
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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