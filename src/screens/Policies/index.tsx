import { useEffect, useState } from "react";
import { Grid, IconButton, OutlinedInput, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

import { api } from "../../config/api";

import { CustomButton } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { theme } from "../../styled";
import { useToast } from "../../context/ToastContext";
import { TimeLinePolicy } from "./TimeLinePolicy";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../context/AuthContext";

export function Policies() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const [isVisible, setVisible] = useState(false);
  const [tipo, setTipo] = useState<string | null>(null);

  const handleVisible = () => setVisible(!isVisible);

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
          <IconButton onClick={() => handleOpenTimeLinePolicy(params.row.tipo)}>
            <VisibilityIcon />
          </IconButton>
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
        });

        if(error.response.status){
          signOut();
        }
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSelected(id: number) {
    return navigate(`/register-policy/${id}`);
  }

  async function handleOpenTimeLinePolicy(tipo: string){
    setTipo(tipo);
    handleVisible()
  }

  useEffect(() => {
    fetchData()
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Loading isLoading={loading}/>
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
      {tipo && 
      <TimeLinePolicy 
        isVisible={isVisible}
        changeState={handleVisible}
        tipo={tipo}
      />}
    </Grid >
  )
}