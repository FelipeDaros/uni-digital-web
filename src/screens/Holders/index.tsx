import { useEffect, useState } from "react";
import { Grid, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { Circle } from "../../components/Circle";

import { api } from "../../config/api";

export function Holders() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
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
      field: 'produto',
      headerName: 'Assinatura',
      width: 300,
    },
    {
      field: 'total',
      headerName: 'Valor',
      width: 150,
    },
    {
      field: 'data_inicio',
      headerName: 'Data inícioo',
      width: 150,
    },
    {
      field: 'qtd_secundario',
      headerName: 'Qtd secundários',
      width: 150,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleSelected(params.row.id)}>
            <CreateIcon />
          </IconButton>
        </>
      ),
    }
  ];

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/usuarios', {
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

  function handleSelected(id: number) {
    return navigate(`/holder/${id}`);
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Títulares
      </Typography>
      <p>Abaixo estão todos os titulares da plataforma</p>
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