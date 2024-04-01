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
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";
import { api } from "../../config/api";
import { useToast } from "../../context/ToastContext";

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
  const { codigo } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState("");
  const [listar, setListar] = useState("");
  const [rowSelected, setRowSelected] = useState(null);

  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const formRef = useRef<FormHandles>(null)

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

      if(codigo){
        const { data } = await api.get(`/cupons/show/${codigo}`);
        if(data.data){
          formRef.current.setFieldValue('descricao', data.data.descricao)
          formRef.current.setFieldValue('limite', data.data.limite)
          formRef.current.setFieldValue('quantidade', data.data.quantidade)
          formRef.current.setFieldValue('valor', data.data.valor)
          formRef.current.setFieldValue('vigencia_final', data.data.vigencia_final)
          formRef.current.setFieldValue('vigencia_inicio', data.data.vigencia_inicio)
          formRef.current.setFieldValue('tipo', data.data.tipo)
          formRef.current.setFieldValue('listar', data.data.listar)
          setTipo(data.data.tipo);
          setListar(data.data.listar)
          setRowSelected(data.data.id_produto)
        }
      }


    } catch (error: any) {
      if(!!error.response){
        showToast({
          message: error.response.data.message,
          color: 'error'
        })
        return;
      }

      showToast({
        message: error.message,
        color: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(dados: any) {
    console.log(rowSelected)
    if (!rowSelected) return;

    try {
      setLoading(true);
      const payload = {
        ...dados,
        id_produto: rowSelected,
        tipo,
        listar,
        quantidade: 0
      }
      await api.post('/cupons/store', payload);
      navigate('/cupom')
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, pageSize])

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Loading isLoading={loading} />
      <Form ref={formRef} placeholder="form" onSubmit={handleSave}>
        <Grid container spacing={2} component={Paper} pr={2} pb={2}>
          <Grid p={2}>
            <Typography fontWeight="bold" textAlign="start">
              Dados do cupom
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LabelText>Descrição</LabelText>
            <VTextField
              size="small"
              autoComplete="descricao"
              name="descricao"
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
              onRowClick={({ row }) => setRowSelected(row.id)}
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
            <Typography>Voltar</Typography>
          </CustomButton>
        </Grid>
      </Form>
    </Container>
  )
}