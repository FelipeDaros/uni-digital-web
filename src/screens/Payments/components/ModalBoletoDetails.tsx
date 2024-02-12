import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { Grid, Typography } from "@mui/material"
import { CustomButton } from "../../../components/Button"
import { CopyToClipboardButton } from "../../../components/CopyToClipboardButton"
import { theme } from "../../../styled"

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 700px;
    gap: 8px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #28da9d;
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      width: 400px;
      overflow: scroll;
      margin-top: 100%;
    }

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      margin-bottom: 4px;
    }
  `,
)

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`

type Props = {
  isState: boolean
  title: string
  changeState: () => void
}

const cod_bar = "2344 8634 2532 8769 67657 83453 3456 4434 3456 453990"

export function ModalBoletoDetails({ changeState, isState, title }: Props) {
  return (
    <Modal open={isState} onClose={changeState}>
      <ModalContent>
        <h2 id="unstyled-modal-title" className="modal-title">
          {title}
        </h2>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Vencimento</Typography>
            <p>10/12/2023</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Valor</Typography>
            <p>R$ 39,90</p>
          </Grid>
        </Grid>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Data assinatura</Typography>
            <p>10/12/2023</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Valor próxima recorrencia</Typography>
            <p>R$ 39,90</p>
          </Grid>
          <Grid container item xs={12} sm={12}>
            <p>Sua próxima cobraça será dia 10 de janeiro de 2024</p>
          </Grid>
        </Grid>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Assintarua</Typography>
            <p>UniDigital Individual</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Forma pagamento</Typography>
            <p>Boleto</p>
          </Grid>
        </Grid>
        <Grid direction="row" p={2}>
          <Grid item xs={12} sm={12}>
            <Typography fontWeight="bold">Código de barras</Typography>
          </Grid>
          <Grid direction="row" display="flex" alignItems="center">
            <Grid item xs={11} sm={11}>
              <p>2344 8634 2532 8769 67657 83453 3456 4434 3456 453990</p>
            </Grid>
            <Grid item xs={1} sm={1}>
              <CopyToClipboardButton cod_bar={cod_bar} />
            </Grid>
          </Grid>
        </Grid>
        <Grid direction="row" p={2}>
          <Grid item xs={12} sm={12}>
            <Typography fontWeight="bold">Status</Typography>
            <p>Em abertura</p>
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
          <CustomButton
            variant="contained"
            onClick={changeState}
            color="success"
            sx={{ color: "#fff" }}
          >
            PDF NFSe
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={changeState}
            color="success"
            sx={{ color: "#fff" }}
          >
            Enviar por e-mail
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={changeState}
            color="success"
            sx={{ color: "#fff" }}
          >
            Alterar forma pagamento
          </CustomButton>
        </Grid>
      </ModalContent>
    </Modal>
  )
}
