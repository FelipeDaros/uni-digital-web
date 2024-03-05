import {
  Grid,
  Paper,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { ModalBoletoDetails } from "./components/ModalBoletoDetails"
import { useAuth } from "../../context/AuthContext"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { api } from "../../config/api"
import { useToast } from "../../context/ToastContext"

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'documento',
    headerName: 'Documento',
    width: 150,
    editable: true,
  },
  {
    field: 'celular',
    headerName: 'Celular',
    type: 'number',
    width: 200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 400,
    editable: true,
  }
];

export function Payment() {
  const { user } = useAuth()
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isStateModalBoletoDetails, setIsStateModalBoletoDetails] = useState(false)
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handleStateModalBoletoDetails = () =>
    setIsStateModalBoletoDetails(!isStateModalBoletoDetails)

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/pagamentos/historico-pagamento`, {
        params: {
          pageSize: pageSize,
          page: page
        }
      });
      const payload = {
        rows: data.data,
        columns,
        experimentalFeatures: true,

      }
      // @ts-ignore
      setGridData(payload)
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.user.ativo !== 1) {
      validatePaymentDefaulter()
    }

    fetchData()
  }, [pageSize])

  function validatePaymentDefaulter() {
    showToast({
      color: 'info',
      message: 'Sua assinatura não está ativa. Por favor, regularize para ter acesso a todos os serviços do UniDigital'
    })
  }

  return (
    <Grid margin={2} pt={4} pb={4}>
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
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        {gridData &&
          <DataGrid
            // @ts-ignore
            {...gridData}
            initialState={{
              pagination: { paginationModel: { pageSize: pageSize, page } },
            }}
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            onPaginationModelChange={e => {
              setPage(e.page)
              setPageSize(e.pageSize)
            }}
          />
        }
      </Paper>
      <ModalBoletoDetails
        isState={isStateModalBoletoDetails}
        changeState={handleStateModalBoletoDetails}
        title="Dados Fatura"
      />
    </Grid>
  )
}
