import { Grid, MenuItem, Typography } from "@mui/material"
import { VSelect } from "../../components/Select/VSelect"
import { Form } from "@unform/web"
import { LabelText } from "../FormRegisterClient/components/StepTwo/style"
import { useRef, useState } from "react"
import { FormHandles } from "@unform/core"
import { CustomButton } from "../../components/Button"
import { CreditCard } from "../Signature/CreditCard"
import { useNavigate } from "react-router-dom"

const TIPO_PAGAMENTO = ["PIX", "BOLETO", "CARTAO"]

export function ChangePaymentMethod() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const formRef = useRef<FormHandles>(null)

  function handleSave(dados: any) {
    console.log(dados)
  }

  const handleChange = (event: any) => {
    setSelectedPayment(event.target.value as string);
  };

  return (
    <Grid pt={4} pb={4}>
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
          <VSelect
            type="text"
            required
            size="small"
            id="tipo_pagamento"
            name="tipo_pagamento"
            color="success"
            variant="standard"
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
        </Grid>
        {selectedPayment === "CARTAO" && (
          <Grid p={2}>
            <CreditCard />
          </Grid>
        )}
        <Grid p={2} container gap={3}>
          <CustomButton type="submit" variant="outlined" color="success">
            Salvar
          </CustomButton>
          <CustomButton type="button" variant="text" color="success" onClick={() => navigate('/signature')}>
            Alterar assinatura
          </CustomButton>
        </Grid>
      </Form>
    </Grid>
  )
}
