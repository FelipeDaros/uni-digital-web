import { Grid, Typography } from "@mui/material";
import { CopyToClipboardButton } from "../../components/CopyToClipboardButton";
import { useParams } from "react-router-dom";
import { CustomButton } from "../../components/Button";
import { StyledContainerAwatingPayment } from "./styles";
import { useEffect, useState } from "react";

type RetornoProps = {
  code: string;
  link: string;
}

export function AwaitingPayment() {
  const [retorno, setRetorno] = useState<null | RetornoProps>(null);
  const { type } = useParams();

  async function fetchData() {
    const { original } = JSON.parse(window.localStorage.getItem("retorno_pagamento"))
    setRetorno(original.data);
    // const response = await fetch('https://sandbox.api.pagseguro.com/qrcode/QRCO_2C5AE1F7-3345-4C1C-BE32-6338DDF03EEF/base64', {
    //   method: 'GET'
    // })/

    console.log(retorno)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <StyledContainerAwatingPayment>
      <Typography color="white" pt={4} fontWeight="bold" textAlign="center" variant="h5">
        Realize o pagamento da assinatura abaixo
      </Typography>
      <Grid mt={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {type === "PIX" &&
          <>
            <Typography color="white" fontWeight="bold" textAlign="center">
              Copie o código abaixo e efetue o pagamento do pix
            </Typography>
            {retorno &&
              <img
                src={retorno.link.replace("base64", "png")}
                width={200}
                height={200}
                style={{ marginTop: 20 }}
              />}
          </>
        }
        {type === "BOLETO" &&
          <>
            <Typography color="white" mb={2} fontWeight="bold" textAlign="center">
              Copie o código abaixo e efetue o pagamento do boleto
            </Typography>
            <CustomButton onClick={() => { }} type="button" color="success" variant="contained">
              <Typography color="#fff">Download boleto</Typography>
            </CustomButton>
          </>
        }
        <Grid mt={2} display="flex" alignItems="center" justifyContent="center">
          <Typography color="white" fontWeight="bold" textAlign="center">
            {retorno && retorno.code}
          </Typography>
          {retorno && <CopyToClipboardButton cod_bar={retorno.code} />}
        </Grid>
      </Grid>
      <Grid mt={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CustomButton onClick={() => { }} type="button" color="success" variant="contained">
          <Typography color="#fff">Página inicial</Typography>
        </CustomButton>
      </Grid>
    </StyledContainerAwatingPayment>
  )
}