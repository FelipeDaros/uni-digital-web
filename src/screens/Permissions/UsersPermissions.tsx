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
import { ModalPermissionUser } from "./Components/ModalPermissionUser";



const columns: GridColDef[] = [
  { field: 'status', headerName: '', width: 30, renderCell: (params) => (<Circle colorCircle={params.row.ativo} />) },
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 200,
  },
  {
    field: 'documento',
    headerName: 'Documento',
    width: 200,
  }
];

export function UsersPermissions() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const [userId, setUserId] = useState<null | number>(null);

  const [isStateModalPermissionUser, setIsStateModalPermissionUser] = useState(false);

  const handleStateModalPermissionUser = () => setIsStateModalPermissionUser(!isStateModalPermissionUser);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/auth/list-clientes', {
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
    setUserId(id);
    handleStateModalPermissionUser();
  }

  async function handleSavePermissionUser(dados: any) {
    if (!dados.perfil) {
      showToast({
        color: 'info',
        message: 'É necessário informar o perfil'
      })
      return
    }

    try {
      setLoading(true)

      const payload = {
        usuario: dados.id,
        funcao: dados.perfil
      }

      const { data } = await api.post('/permissoes/usuario/create', payload);
      showToast({ message: data.message, color: 'success' });
      handleStateModalPermissionUser();
    } catch (error: any) {
      if (!!error.response) {
        showToast({ message: error.response.data.message, color: 'error' })
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
        Cadastro de permissões aos usuários
      </Typography>
      <p>Cadastre suas permissões de uso da plataforma para os usuários</p>
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
      {userId &&
        <ModalPermissionUser
          changeState={handleStateModalPermissionUser}
          isState={isStateModalPermissionUser}
          onOk={handleSavePermissionUser}
          userId={userId}
        />
      }
    </Grid >
  )
}