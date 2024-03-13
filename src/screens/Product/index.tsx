import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { api } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styled";

import { Grid, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';

import { Circle } from "../../components/Circle";
import { CustomButton } from "../../components/Button";


export function Products() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const columns: GridColDef[] = [
    { field: 'status', headerName: '', width: 30, renderCell: (params) => (<Circle colorCircle={params.row.ativo} />) },
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 200,
    },
    {
      field: 'descricao',
      headerName: 'Descricao ',
      width: 200,
    },
    {
      field: 'preco',
      headerName: 'Preco',
      type: 'number',
      width: 200,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Ação',
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => params.row.ativo === 1 ? handleAlterProduct(params.row.id, params.row, 0) : handleAlterProduct(params.row.id, params.row, 1)}>
            {params.row.ativo === 1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton onClick={() => handleSelected(params.row.id)}>
            <CreateIcon />
          </IconButton>
        </>
      ),
    },
  ];

  async function handleAlterProduct(id: number, row: any, ativo: number) {
    try {
      setLoading(true)
      const payload = {
        ...row,
        ativo
      }
      const { data } = await api.put(`/produtos/update/${id}`, payload)
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

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/produtos/list-products', {
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

  function handleSelected(id: number) {
    return navigate(`/register-product/${id}`);
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Cadastro de produtos
      </Typography>
      <p>Cadastre seus produtos de uso na plataforma</p>
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
        <CustomButton onClick={() => navigate('/register-product')} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          Novo
        </CustomButton>
      </Grid>
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        {gridData &&
          <DataGrid
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
    </Grid >
  )
}