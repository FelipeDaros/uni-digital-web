import { Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CustomButton } from "../../components/Button";

import AddIcon from '@mui/icons-material/Add';
import { ModalAddDependets } from "../../components/ModalAddDependets";
import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { VModalError } from "../../components/ModalError";

export function Dependents() {
  const [stateModalErro, setStateModalErro] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const { user } = useAuth()
  const [isStateModalAddDependets, setIsStateModalAddDependets] = useState(false);

  const handleIsStateModalAddDependets = () => setIsStateModalAddDependets(!isStateModalAddDependets);
  const handleStateModalErro = () => setStateModalErro(!stateModalErro);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get(`/auth/dependentes/${user?.user.id}`, {
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
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  async function handleAddDependent(dados: any){
    if(!dados.nome && !dados.data_nascimento && !dados.email && !dados.documento && !dados.sexo){
      return
    }

    try {
      setLoading(true);
      await api.post('/auth/add-dependente', dados);
      fetchData();
      handleIsStateModalAddDependets();
    } catch (error: any) {
      if(!!error.response){
        setMsgErro(error.response.data.message);
      }
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageSize])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 150,
      editable: true,
    },
    {
      field: 'documento',
      headerName: 'Documento',
      width: 150,
      editable: true,
    },
    {
      field: 'celular',
      headerName: 'Celular',
      type: 'number',
      width: 200,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 400,
      editable: true,
    }
  ];

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Cadastro de dependentes
      </Typography>
      <p>Informe as pessoas vinculadas ao seu UniDigital</p>
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
      <Grid mt={2} justifyContent="end" display="flex">
        <CustomButton onClick={handleIsStateModalAddDependets} startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
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
            pageSizeOptions={[10, 25, 50]}
            onPaginationModelChange={e => {
              setPage(e.page)
              setPageSize(e.pageSize)
            }}
          />
        }
      </Paper>
      <ModalAddDependets
        changeState={handleIsStateModalAddDependets}
        isState={isStateModalAddDependets}
        onOk={handleAddDependent}
      />
      <VModalError 
        changeState={handleStateModalErro}
        description={msgErro}
        isState={stateModalErro}
        title="Erro"
      />
    </Grid >
  )
}