import { Grid, Typography } from "@mui/material";
import { CopyToClipboardButton } from "../../components/CopyToClipboardButton";
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../components/Button";
import { StyledContainerAwatingPayment } from "./styles";
import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";

type RetornoProps = {
  code: string;
  link: string;
}

export function AwaitingPayment() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [retorno, setRetorno] = useState<null | RetornoProps>(null);
  const { type } = useParams();

  async function fetchData() {
    try {
      const { original } = JSON.parse(window.localStorage.getItem("retorno_pagamento"))
      setRetorno(original.data);
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          message: error.response.data.message,
          color: 'error'
        })
      }
    }
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
        <CustomButton onClick={() => navigate('/')} type="button" color="success" variant="contained">
          <Typography color="#fff">Página inicial</Typography>
        </CustomButton>
      </Grid>
    </StyledContainerAwatingPayment>
  )
}