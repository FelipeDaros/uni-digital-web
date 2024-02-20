import { Grid, IconButton, MenuItem, Select, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"
import { LabelText } from "../FormRegisterClient/components/StepTwo/style"

export function DependentForm() {
  const [formularioDependente, setFormularioDependente] = useState({
    nome: "",
    documento: "",
    data_nascimento: "",
    email: "",
    sexo: "",
  })

  function handleAdd() {
    //@ts-ignore
    handleAddDependente(formularioDependente)

    setFormularioDependente({
      data_nascimento: "",
      documento: "",
      email: "",
      nome: "",
      sexo: "",
    })
  }

  return (
    <Grid container spacing={3} direction="row">
      <Grid item xs={12} sm={3} marginTop={2}>
        <LabelText htmlFor="">Nome</LabelText>
        <TextField
          type="text"
          size="small"
          id="nomeDependent"
          fullWidth
          color="success"
          variant="standard"
          value={formularioDependente.nome}
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              nome: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={2} marginTop={2}>
        <LabelText htmlFor="">CPF</LabelText>
        <TextField
          type="text"
          size="small"
          id="documentoDependent"
          fullWidth
          color="success"
          variant="standard"
          value={formularioDependente.documento}
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              documento: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid item xs={12} sm={2} marginTop={2}>
        <LabelText style={{ fontSize: 10 }}>Data nasci.</LabelText>
        <TextField
          size="small"
          id="data_nascimentoDependent" // Updated the id to match the correct property name
          fullWidth
          type="date"
          color="success"
          variant="standard"
          value={formularioDependente.data_nascimento} // Updated property name
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              data_nascimento: e.target.value,
            }))
          } // Updated property name
        />
      </Grid>
      <Grid item xs={12} sm={2} marginTop={2}>
        <LabelText htmlFor="">Sexo</LabelText>
        <Select
          type="text"
          size="small"
          id="sexoDependent"
          fullWidth
          color="success"
          variant="standard"
          value={formularioDependente.sexo}
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              sexo: e.target.value,
            }))
          }
        >
          <MenuItem value="M">Masculino</MenuItem>
          <MenuItem value="F">Feminino</MenuItem>
          <MenuItem value="N">Não informar</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={2} marginTop={2}>
        <LabelText htmlFor="">Email</LabelText>
        <TextField
          type="text"
          size="small"
          id="emailDependent"
          fullWidth
          color="success"
          variant="standard"
          value={formularioDependente.email}
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              email: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={1}
        marginTop={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton
          onClick={handleAdd}
          size="small"
          sx={{ backgroundColor: "#28DA9D" }}
        >
          <AddIcon color="primary" sx={{ fontSize: 16 }} />
        </IconButton>
      </Grid>
    </Grid>
  )
}