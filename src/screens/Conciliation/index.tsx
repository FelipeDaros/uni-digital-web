import { useEffect, useRef, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { api } from "../../config/api";

import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef, ptBR } from "@mui/x-data-grid";

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';

import { CustomButton } from "../../components/Button";
import { VTextField } from "../../components/Input/VTextField";
import { LabelText } from "../FormRegisterClient/components/StepTwo/style";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import * as XLSX from "xlsx"

export function Conciliation() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const formRef = useRef<FormHandles>(null);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 200,
    },
    {
      field: 'valor_venda',
      headerName: 'Valor de venda ',
      width: 200,
    },
    {
      field: 'data_adesao',
      headerName: 'Data de adesão',
      width: 200,
    },
  ];

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/relatorio-conciliacao', {
        params: {
          dataInicio: formRef.current?.getData()?.dataInicio,
          dataFim: formRef.current?.getData()?.dataFim,
          pageSize: pageSize,
          page: page
        }
      });

      const payload = {
        rows: data.data,
        columns,
        experimentalFeatures: true,
        // rowCount: 5
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

  function handleExportData() {
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Formata a data no formato YYYY-MM-DD

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(gridData.rows);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vendas');

      const fileName = `conciliacao_${formattedDate}.xlsx`;

      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      showToast({
        color: 'error',
        message: "Erro ao tentar realizar a exportação"
      });
    }
  }

  useEffect(() => {
    if(formRef.current?.getData()?.dataInicio && formRef.current?.getData()?.dataFim){
      fetchData();
    }
  }, [page, pageSize])

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Relatório Conciliação
      </Typography>
      <Form ref={formRef} placeholder="form" onSubmit={fetchData}>
        <Grid container display="flex" alignItems="center" gap={3} flexDirection="row">
          <Grid xs={2}>
            <LabelText htmlFor="">Data inicial</LabelText>
            <VTextField
              size="small"
              required
              id="dataInicio"
              name="dataInicio"
              fullWidth
              type="date"
              color="success"
              variant="standard"
            />
          </Grid>
          <Grid xs={2}>
            <LabelText htmlFor="">Data final</LabelText>
            <VTextField
              size="small"
              required
              id="dataFim"
              name="dataFim"
              fullWidth
              type="date"
              color="success"
              variant="standard"
            />
          </Grid>
          <CustomButton
            size="small"
            type="submit"
            color="success"
            variant="contained"
            endIcon={<SearchIcon color="primary" />}
            sx={{ height: 35 }}
          >
            <Typography color="#fff">Buscar</Typography>
          </CustomButton>
          <CustomButton
            size="small"
            type="button"
            color="success"
            variant="outlined"
            endIcon={<SaveAltIcon color="success" />}
            sx={{ height: 35, borderWidth: 2 }}
            onClick={handleExportData}
            disabled={!gridData}
          >
            <Typography color="#26DA9C">Exportar</Typography>
          </CustomButton>
        </Grid>
      </Form>
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        {gridData &&
          <DataGrid
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