import { styled, css } from "@mui/system"
import { Modal as BaseModal } from "@mui/base/Modal"
import { Grid, Typography } from "@mui/material"
import { CustomButton } from "../../../components/Button"
import { CopyToClipboardButton } from "../../../components/CopyToClipboardButton"
import { theme } from "../../../styled"
import { useEffect, useState } from "react"
import { api } from "../../../config/api"
import { useToast } from "../../../context/ToastContext"


const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 700px;
    gap: 3px;
    overflow: visible;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #28da9d;
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    margin-top: 10%;

    @media (max-width: ${theme.breakpoints.values.sm}px) {
      width: 90%; /* Alteração na largura para ocupar a maior parte da tela */
      overflow: visible; /* Removendo a rolagem */
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
  id: number;
  isState: boolean;
  title: string;
  changeState: () => void;
}

type PagamentoProps = {
  valor: number;
  data_assinatura: string;
  nome_produto: string;
  valor_proxima_fatura: number;
}

type BoletoProps = {
  id: number;
  nome_titular: string;
  numero: string;
  data_vencimento: string;
  cvv: number;
  ativo: number;
  id_dono: number;
  created_at: Date;
  updated_at: Date;
  link: string;
}

type PropsFetch = {
  boleto: BoletoProps;
  pagamento: PagamentoProps;
}

export function ModalBoletoDetails({ changeState, isState, title, id }: Props) {
  const { showToast } = useToast();
  const [payload, setPayload] = useState<PropsFetch | null>(null);

  async function fetchData() {
    try {
      const { data } = await api.get(`/pagamentos/boleto/${id}`)
      setPayload(data.data)
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          message: error.response.data.message,
          color: 'error'
        })
      }
    } finally {

    }
  }

  useEffect(() => {
    if (isState) {
      fetchData()
    }
  }, [isState])

  return (
    <Modal open={isState} onClose={changeState}>
      <ModalContent>
        <h2 id="unstyled-modal-title" className="modal-title">
          {title}
        </h2>
        <Grid container p={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Vencimento</Typography>
            <p>{payload?.boleto.data_vencimento}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Valor</Typography>
            <p>{Number(payload?.pagamento.valor)?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</p>
          </Grid>
        </Grid>
        <Grid container p={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Data assinatura</Typography>
            <p>{payload?.pagamento?.data_assinatura}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Valor próxima recorrencia</Typography>
            <p>{Number(payload?.pagamento?.valor_proxima_fatura)?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</p>
          </Grid>
        </Grid>
        <Grid container p={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight="bold">Assintarua</Typography>
            <p>{payload?.pagamento?.nome_produto}</p>
          </Grid>
        </Grid>
        <Grid p={2}>
          <Grid item xs={12} sm={12}>
            <Typography fontWeight="bold">Código de barras</Typography>
          </Grid>
          <Grid display="flex" alignItems="center">
            <Grid item xs={11} sm={11}>
              <p>{payload?.boleto?.numero}</p>
            </Grid>
            <Grid item xs={1} sm={1}>
              <CopyToClipboardButton cod_bar={payload?.boleto?.numero} color="success" />
            </Grid>
          </Grid>
          <Grid container item xs={12} sm={12}>
            <p>Sua próxima cobraça será {payload?.boleto?.data_vencimento}</p>
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
            onClick={() => { }}
            color="success"
            sx={{ color: "#fff" }}
            disabled
          >
            PDF NFSe
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={() => { }}
            color="success"
            sx={{ color: "#fff" }}
            disabled
          >
            Enviar por e-mail
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={() => { }}
            color="success"
            sx={{ color: "#fff" }}
            disabled
          >
            Alterar forma pagamento
          </CustomButton>
          <CustomButton
            variant="contained"
            onClick={changeState}
            color="error"
            sx={{ color: "#fff" }}
          >
            Fechar
          </CustomButton>
        </Grid>
      </ModalContent>
    </Modal>
  )
}
