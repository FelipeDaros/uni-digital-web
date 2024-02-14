import { Grid, OutlinedInput, Paper, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { CustomButton } from "../../components/Button";

import AddIcon from '@mui/icons-material/Add';

export function Dependents() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 50,
    maxColumns: 5
  });

  console.log(data)

  const coluns = [
    {
      "field": "id",
      "headerName": "ID",
      "width": '5%',
    },
    {
      "field": "name",
      "headerName": "NOME",
      "dataGeneratorUniquenessEnabled": true,
      "width": '30%',
      "groupable": false,
      "aggregable": false
    },
    {
      "field": "cpf",
      "headerName": "CPF",
      "dataGeneratorUniquenessEnabled": true,
      "width": '10%',
      "editable": true,
      "groupable": false,
      "aggregable": false
    },
    {
      "field": "fone",
      "headerName": "Fone",
      "dataGeneratorUniquenessEnabled": true,
      "width": '10%',
      "editable": true,
      "groupable": false,
      "aggregable": false
    },
    {
      "field": "email",
      "headerName": "email",
      "dataGeneratorUniquenessEnabled": true,
      "width": '25%',
      "editable": true,
      "groupable": false,
      "aggregable": false
    }
  ]

  return (
    <Grid margin={2} pt={4} pb={4}>
      <Typography fontWeight="bold" textAlign="start">
        Cadastro de dependentes
      </Typography>
      <p>Informe oas pessoas vinculadas ao seu UniDigital</p>
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
        <CustomButton startIcon={<AddIcon color="primary" />} size="small" color="success" variant="contained" sx={{ color: 'white' }}>
          Novo
        </CustomButton>
      </Grid>
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        <DataGrid
          {...data}
        />
      </Paper>
    </Grid >
  )
}