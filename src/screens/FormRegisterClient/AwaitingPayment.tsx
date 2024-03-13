import { Grid, Typography } from "@mui/material";
import { CopyToClipboardButton } from "../../components/CopyToClipboardButton";
import { useParams } from "react-router-dom";
import { CustomButton } from "../../components/Button";
import { StyledContainerAwatingPayment } from "./styles";

export function AwaitingPayment() {
  const { type } = useParams();

  return (
    <StyledContainerAwatingPayment>
      <Typography color="white" pt={4} fontWeight="bold" textAlign="center" variant="h5">
        Realize o pagamento da assinatura abaixo
      </Typography>
      <Grid mt={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {type === "P" &&
          <>
            <Typography color="white" fontWeight="bold" textAlign="center">
              Copie o código abaixo e efetue o pagamento do pix
            </Typography>
            <img
              src="https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format&dpr=2"
              width={200}
              height={200}
              style={{ marginTop: 20 }}
            />
          </>
        }
        {type === "B" &&
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
            asd21312qsdsaqd1231dsa
          </Typography>
          <CopyToClipboardButton cod_bar="asd21312qsdsaqd1231dsa" />
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