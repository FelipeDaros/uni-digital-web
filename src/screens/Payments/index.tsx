import {
  Chip,
  Grid,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { CustomButton } from "../../components/Button"
import { VModalNotification } from "../../components/ModalNotification"
import { useEffect, useState } from "react"
import { ModalBoletoDetails } from "./components/ModalBoletoDetails"
import { useAuth } from "../../context/AuthContext"

function createData(
  id: number,
  status: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { id, status, calories, fat, carbs, protein }
}

const rows = [
  createData(1, "PENDENTE", 159, 6.0, 24, 4.0),
  createData(2, "PENDENTE", 237, 9.0, 37, 4.3),
  createData(3, "PAGO", 262, 16.0, 24, 6.0),
  createData(4, "PAGO", 305, 3.7, 67, 4.3),
  createData(5, "PAGO", 356, 16.0, 49, 3.9),
]

export function Payment() {
  const { user } = useAuth()
  const [isStateModalDefaulter, setIsStateModalDefaulter] = useState(false)
  const [isStateModalBoletoDetails, setIsStateModalBoletoDetails] =
    useState(false)

  const handleStateModalDefaulter = () =>
    setIsStateModalDefaulter(!isStateModalDefaulter)

  const handleStateModalBoletoDetails = () =>
    setIsStateModalBoletoDetails(!isStateModalBoletoDetails)

  useEffect(() => {
    if (user?.defaulterSignature) {
      validatePaymentDefaulter()
    }
  }, [])

  function validatePaymentDefaulter() {
    setIsStateModalDefaulter(true)
  }

  return (
    <Grid margin={2} mt={4}>
      <Grid container spacing={2} component={Paper} pr={2} pb={2}>
        <Grid p={2} container>
          <Typography fontWeight="bold" textAlign="start">
            Fatura atual
          </Typography>
        </Grid>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Vencimento</Typography>
            <p>10/12/2023</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Valor</Typography>
            <p>R$ 39,90</p>
          </Grid>
        </Grid>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Assinatura</Typography>
            <p>UniDigital Individual</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Forma pagamento</Typography>
            <p>Boleto</p>
          </Grid>
        </Grid>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Em aberto</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Ver detalhes</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid p={2} container>
        <Typography fontWeight="bold" textAlign="start">
          Histórico de faturas
        </Typography>
      </Grid>
      <TableContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 650,
        }}
      >
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Vencimento</TableCell>
              <TableCell align="center">Valor</TableCell>
              <TableCell align="center">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    color={row.status === "PAGO" ? "success" : "warning"}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">
                  <CustomButton variant="outlined" color="success">
                    Visualizar
                  </CustomButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Stack spacing={2} mt={2}>
          <Pagination
            count={5}
            variant="outlined"
            shape="rounded"
            color="success"
            size="small"
          />
        </Stack>
      </TableContainer>
      <VModalNotification
        title="Assinatura"
        description="Sua assinatura não está ativa. Por favor, regularize para ter acesso a todos os serviços do UniDigital"
        isState={isStateModalDefaulter}
        changeState={handleStateModalDefaulter}
      />
      <ModalBoletoDetails
        isState={isStateModalBoletoDetails}
        changeState={handleStateModalBoletoDetails}
        title="Dados Fatura"
      />
    </Grid>
  )
}
