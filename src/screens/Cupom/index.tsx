import { useEffect, useState } from "react";
import { Grid, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';

import { api } from "../../config/api";

import { CustomButton } from "../../components/Button";
import { theme } from "../../styled";
import { useToast } from "../../context/ToastContext";
import { Circle } from "../../components/Circle";

export function Cupom() {
  const { showToast } = useToast();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const columns: GridColDef[] = [
    { field: 'status', headerName: '', width: 30, renderCell: (params) => (<Circle colorCircle={params.row.ativo} />) },
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'descricao',
      headerName: 'Descricao',
      width: 300,
    },
    {
      field: 'codigo',
      headerName: 'Código',
      width: 250,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 130,
    },
    {
      field: 'valor',
      headerName: 'Valor',
      type: 'number',
      width: 150,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => params.row.ativo === 1 ? handleAlterCupom(params.row.id, params.row, 0) : handleAlterCupom(params.row.id, params.row, 1)}>
            {params.row.ativo === 1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton onClick={() => handleSelected(params.row.codigo)}>
            <CreateIcon />
          </IconButton>
        </>
      ),
    },
  ];

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/cupons/list', {
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
          message: error.response.data.message,
          color: 'error'
        })
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelected(codigo: number) {
    return navigate(`/register-cupom/${codigo}`);
  }

  async function handleAlterCupom(id: number, row: any, ativo: number) {
    try {
      setLoading(true)
      const payload = {
        ...row,
        ativo
      }
      const { data } = await api.put(`/cupons/update/${id}`, payload)
      await fetchData();
      showToast({
        color: 'success',
        message: data.message
      })
    } catch (error: any) {
      if (!!error.response) {
        showToast({
          color: 'error',
          message: error.response.data.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Cadastro de cupoons
      </Typography>
      <p>Cadastre os cupons para seus clientes</p>
      <OutlinedInput
        id="outlined-adornment-weight"
        endAdornment={<SearchIcon />}
        aria-describedby="outlined-weight-helper-text"
        color="success"
        size="small"
        placeholder="Pesquisa rápida"
        inputProps={{
          'aria-label': 'weight',
        }}
      />
      <Grid mt={2} justifyContent="end" display="flex" sx={{
        [theme.breakpoints.down("md")]: {
          alignItems: "center",
          justifyContent: "center"
        },
      }}>
        <CustomButton onClick={() => navigate('/register-cupom')} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          Novo
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
            disableRowSelectionOnClick
          />
        }
      </Paper>
    </Grid >
  )
}