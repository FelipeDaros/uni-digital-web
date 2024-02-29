import { FormHandles } from "@unform/core"
import { useEffect, useRef, useState } from "react"
import { CustomButton } from "../../components/Button";
import { Container, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { VTextField } from "../../components/Input/VTextField";
import { theme } from "../../styled";
import { Loading } from "../../components/Loading";
import { Form } from "@unform/web";
import { handleKeyPress } from "../../utils/handleKeyPress";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";
import { api } from "../../config/api";

const columns: GridColDef[] = [
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
  }
];

export function RegisterCupom() {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("");
  const [listar, setListar] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  async function fetchData() {
    try {
      setLoading(true);

      const { data } = await api.get('/produtos/list-all', {
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
      navigate('/cupom')
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  async function handleSave(dados: any) {
    if(!rowSelected)return;

    try {
      setLoading(true);
      const payload = {
        ...dados,
        id_produto: rowSelected.row.id,
        tipo,
        listar
      }
      await api.post('/cupons/store', payload);
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, pageSize])

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2}>
            <Typography fontWeight="bold" textAlign="start">
              Dados do cupom
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LabelText>Nome</LabelText>
            <VTextField
              size="small"
              autoComplete="nome"
              name="nome"
              required
              color="success"
              fullWidth
              id="descricao"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Tipo</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={e => setTipo(e.target.value)}
              value={tipo}
              id="tipo"
              name="tipo"
            >
              <FormControlLabel
                value="VALOR_TOTAL"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Valor total"
              />
              <FormControlLabel
                value="PORCENTAGEM"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Porcentagem"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={2}>
            <LabelText>Valor</LabelText>
            <VTextField
              size="small"
              autoComplete="valor"
              name="valor"
              required
              color="success"
              fullWidth
              id="valor"
              autoFocus
              type="text"
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <LabelText>Quantidade</LabelText>
            <VTextField
              size="small"
              autoComplete="quantidade"
              name="quantidade"
              required
              color="success"
              fullWidth
              id="quantidade"
              autoFocus
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <LabelText>Limite</LabelText>
            <VTextField
              size="small"
              name="limite"
              required
              color="success"
              fullWidth
              id="limite"
              autoFocus
              type="text"
              onKeyPress={handleKeyPress}
            />
          </Grid>
          <Grid item xs={12}>
            <LabelText htmlFor="">Listar</LabelText>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={e => setListar(e.target.value)}
              value={listar}
              id="tipo"
              name="tipo"
            >
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Sim"
              />
              <FormControlLabel
                value="0"
                control={
                  <Radio
                    sx={{
                      color: "#28DA9D",
                      "&.Mui-checked": {
                        color: "#28DA9D",
                      },
                    }}
                    size="small"
                  />
                }
                label="Näo"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabelText htmlFor="">Vigëncia início</LabelText>
            <VTextField
              size="small"
              required
              id="vigencia_inicio"
              name="vigencia_inicio"
              placeholder="Data"
              fullWidth
              type="date"
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LabelText htmlFor="">Vigëncia fim</LabelText>
            <VTextField
              size="small"
              required
              id="vigencia_final"
              name="vigencia_final"
              placeholder="Data"
              fullWidth
              type="date"
              color="success"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Paper sx={{ marginTop: 2, marginRight: 2 }}>
          {gridData &&
            <DataGrid
              {...gridData}
              initialState={{
                pagination: { paginationModel: { pageSize: pageSize, page } },
              }}
              loading={loading}
              pageSizeOptions={[5, 10, 25]}
              onPaginationModelChange={e => {
                setPage(e.page)
                setPageSize(e.pageSize)
              }}
              onCellClick={setRowSelected}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          }
        </Paper>
        <Grid
          direction="row"
          display="flex"
          gap={1}
          marginTop={2}
          container
          sx={{
            [theme.breakpoints.down("md")]: {
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            },
          }}
        >
          <CustomButton type="submit" color="success" variant="contained">
            <Typography color="#fff">Salvar</Typography>
          </CustomButton>
          <CustomButton onClick={() => navigate('/cupom')} type="button" color="error" variant="outlined">
            <Typography>Cancelar</Typography>
          </CustomButton>
        </Grid>
      </Form>
    </Container>
  )
}