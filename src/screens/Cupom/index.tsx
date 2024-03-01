import { useEffect, useState } from "react";
import { Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { api } from "../../config/api";

import { CustomButton } from "../../components/Button";
import { useToast } from "../../components/Toast";
import { theme } from "../../styled";



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'descricao',
    headerName: 'Descricao',
    width: 300,
  },
  {
    field: 'codigo',
    headerName: 'Código',
    width: 300,
  },
  {
    field: 'tipo',
    headerName: 'Tipo',
    width: 150,
  },
  {
    field: 'valor',
    headerName: 'Valor',
    type: 'number',
    width: 150,
  },
  {
    field: 'ativo',
    headerName: 'Ativo',
    width: 50,
  }
];

export function Cupom(){
  const { showToast, Toast } = useToast();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);

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
      if(!!error.response){
        showToast(error.response.data.message, 'error')
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return(
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
            {...gridData}
            initialState={{
              pagination: { paginationModel: { pageSize: pageSize, page} },
            }}
            loading={loading}
            pageSizeOptions={[2, 5, 10]}
            onPaginationModelChange={e => {
              setPage(e.page)
              setPageSize(e.pageSize)
            }}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        }
      </Paper>
    </Grid >
  )
}