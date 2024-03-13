import { useEffect, useState } from "react";
import { Grid, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

import { api } from "../../config/api";

import { CustomButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styled";
import { useToast } from "../../context/ToastContext";

export function Policies() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 200,
    },
    {
      field: 'descricao',
      headerName: 'Descricao',
      width: 400,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => params.row.ativo === 1 ? handleAlterPolitica(params.row.id, params.row, 0) : handleAlterPolitica(params.row.id, params.row, 1)}>
            {params.row.ativo === 1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
          <IconButton onClick={() => handleSelected(params.row.tipo)}>
            <CreateIcon />
          </IconButton>
        </>
      ),
    }
  ];

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/politicas/list', {
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

  function handleSelected(tipo: string) {
    return navigate(`/register-policy/${tipo}`);
  }

  async function handleAlterPolitica(id: number, row: any, ativo: number){
    
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Cadastro de políticas
      </Typography>
      <p>Cadastre suas políticas de uso da plataforma</p>
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
      <Grid mt={2} justifyContent="end" display="flex"
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            justifyContent: "center"
          },
        }}>
        <CustomButton onClick={() => navigate('/register-policy')} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
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