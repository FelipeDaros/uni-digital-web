import { useEffect, useState } from "react";
import { Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { api } from "../../config/api";

import { CustomButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styled";
import { useToast } from "../../context/ToastContext";
import { Circle } from "../../components/Circle";



const columns: GridColDef[] = [
  { field: 'status', headerName: '', width: 30, renderCell: (params) => (<Circle colorCircle={params.row.ativa} />) },
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nome',
    headerName: 'Perfil',
    width: 200,
  }
];

export function Permissions() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/permissoes/funcao/list', {
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
        showToast({ message: error.response.data.message, color: 'error' })
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelected(id: number) {
    return navigate(`/register-permission/${id}`);
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Cadastro de permissões
      </Typography>
      <p>Cadastre suas permissões de uso da plataforma</p>
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
      <Grid mt={2} gap={1} justifyContent="end" display="flex"
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            justifyContent: "center"
          },
        }}>
        <CustomButton onClick={() => navigate('/permissions-users')} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          Perfils usuários
        </CustomButton>
        <CustomButton onClick={() => navigate('/register-permission')} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          Cadastrar perfil
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
            onRowClick={({ row }) => handleSelected(row.id)}
          />
        }
      </Paper>
    </Grid >
  )
}