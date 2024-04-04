import {
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { ModalBoletoDetails } from "./components/ModalBoletoDetails"
import { useAuth } from "../../context/AuthContext"
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid"
import { api } from "../../config/api"
import { useToast } from "../../context/ToastContext"
import { CustomButton } from "../../components/Button"

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { IFatura } from "../../interfaces/IFatura"

export function Payment() {
  const { user } = useAuth()
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isStateModalBoletoDetails, setIsStateModalBoletoDetails] = useState(false)
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const [atual, setAtual] = useState<IFatura>(null);
  const [selectBoletoId, setSelectBoletoId] = useState<number | null>();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'tipo',
      headerName: 'Método',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
    },
    {
      field: 'data_pago',
      headerName: 'Data pagamento',
      width: 200,
    },
    {
      field: 'visualizar',
      headerName: 'Visualizar',
      width: 130,
      renderCell: (params) => (
        <IconButton onClick={() => handleBoleto(params.row.id)}>
          {params.row.metodo === "BOLETO" ? <FindInPageIcon /> : <></>}
        </IconButton>
      ),
    }
  ];

  const handleStateModalBoletoDetails = () =>
    setIsStateModalBoletoDetails(!isStateModalBoletoDetails)

  function handleBoleto(id: number){
    setSelectBoletoId(id);
    handleStateModalBoletoDetails();
  }

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/pagamentos/historico-pagamento`, {
        params: {
          pageSize: pageSize,
          page: page,
          id_usuario: user.user.id
        }
      });

      const payload = {
        rows: data.data.historico,
        columns,
        experimentalFeatures: true,

      }
      // @ts-ignore
      setGridData(payload)
      setAtual(data.data.atual);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  function validatePaymentDefaulter() {
    showToast({
      color: 'warning',
      message: 'Sua assinatura não está ativa. Por favor, regularize para ter acesso a todos os serviços do UniDigital'
    })
  }

  function handleDownload() {

  }

  useEffect(() => {
    if (user?.user.ativo !== 1) {
      validatePaymentDefaulter()
    }

    fetchData()
  }, [pageSize])

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
            <p>{atual?.data_vencimento}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Valor</Typography>
            <p>{atual?.valor?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</p>
          </Grid>
        </Grid>
        <Grid direction="row" container p={2}>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Assinatura</Typography>
            <p>{atual?.nome}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography fontWeight="bold">Forma pagamento</Typography>
            <p>{atual?.forma_pagamento}</p>
          </Grid>
        </Grid>
        <Grid direction="row" container p={2}>
          {atual?.forma_pagamento === 'BOLETO' &&
            <CustomButton disabled endIcon={<CloudDownloadIcon />} type="submit" color="error" variant="contained" onClick={handleDownload}>
              <Typography color="#fff">Visualizar</Typography>
            </CustomButton>
          }
          {atual?.forma_pagamento === 'PIX' &&
            <CustomButton disabled endIcon={<CloudDownloadIcon />} type="submit" color="error" variant="contained" onClick={handleDownload}>
              <Typography color="#fff">Visualizar</Typography>
            </CustomButton>
          }
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
            pageSizeOptions={[5, 10, 20]}
            onPaginationModelChange={e => {
              setPage(e.page)
              setPageSize(e.pageSize)
            }}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            disableRowSelectionOnClick
          />
        }
      </Paper>
      <ModalBoletoDetails
        isState={isStateModalBoletoDetails}
        changeState={handleStateModalBoletoDetails}
        title="Dados do boleto"
        id={selectBoletoId}
      />
    </Grid>
  )
}
