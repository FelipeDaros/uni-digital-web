import { useEffect, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Grid, Paper, Typography } from "@mui/material";
import { theme } from "../../styled";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import { useToast } from "../../context/ToastContext";
import { ModalAddScreen } from "./Components/ModalAddScreen";



export function RegisterPermission() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isStateModal, setIsStateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handleStateModal = () => setIsStateModal(!isStateModal);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'tela',
      headerName: 'Tela',
      width: 200,
    },
    {
      field: 'visualizar',
      headerName: 'Visualizar',
      width: 200,
    },
    {
      field: 'cadastrar',
      headerName: 'Cadastrar',
      width: 200,
    },
    {
      field: 'alterar',
      headerName: 'Alterar',
      width: 200,
    },
    {
      field: 'excluir',
      headerName: 'excluir',
      width: 200
    },
  ];

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/permissoes/list', {
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
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAddScreen(dados: any) {
    if (!dados.nome) {
      return
    }

    const payload = {
      tela: String(dados.nome).trim()
    }

    try {
      setLoading(true);
      const { data } = await api.post('/permissoes/create', payload);
      showToast({
        color: 'success',
        message: data.message
      })
      fetchData();
      handleStateModal();
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Perfil
      </Typography>
      <Grid mt={2} justifyContent="end" display="flex"
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            justifyContent: "center"
          },
        }}>
        <CustomButton onClick={() => handleStateModal()} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          TELA
        </CustomButton>
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
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        }
      </Paper>
      <ModalAddScreen
        changeState={handleStateModal}
        isState={isStateModal}
        onOk={handleAddScreen}
      />
    </Grid >
  )
}
