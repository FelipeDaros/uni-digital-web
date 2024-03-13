import { Grid, IconButton, MenuItem, Select, TextField } from "@mui/material"
import { LabelText } from "./style"

import AddIcon from "@mui/icons-material/Add"
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore"
import { useState } from "react"
import { useToast } from "../../../../context/ToastContext"
import { handleKeyPress } from "../../../../utils/handleKeyPress"

export function DependentForm() {
  const { showToast } = useToast();
  const [stateModal, setStateModal] = useState(false);
  const [message, setMessage] = useState("");
  const [formularioDependente, setFormularioDependente] = useState({
    nome: "",
    documento: "",
    dataNascimento: "",
    email: "",
    sexo: "",
  })

  const handleChangeStateModal = () => setStateModal(!stateModal);

  const [handleSecundarios, totalDependets, secundarios] = FormRegisterClientStore((state) => [
    state.handleSecundarios, state.totalDependets, state.secundarios
  ])

  function handleAdd() {
    if (!formularioDependente.dataNascimento.trim() || !formularioDependente.documento.trim() || !formularioDependente.email.trim() || !formularioDependente.nome.trim() || !formularioDependente.sexo.trim()) {
      handleChangeStateModal()
      setMessage("Preencha todos os campos")
      return
    }

    console.log(totalDependets, secundarios.length)
    if (totalDependets === secundarios.length) {
      handleChangeStateModal()
      setMessage("O limite de dependentes foi execidido!")
      showToast({
        color: 'error',
        message: message
      })
      return
    }

    //@ts-ignore
    handleSecundarios(formularioDependente)

    setFormularioDependente({
      dataNascimento: "",
      documento: "",
      email: "",
      nome: "",
      sexo: "",
    })
  }

  return (
    <Grid container mt={2} spacing={2} pr={2} pl={2} pb={2}>
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
          inputProps={{ maxLength: 11 }}
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              documento: e.target.value,
            }))
          }
          onKeyPress={handleKeyPress}
        />
      </Grid>
      <Grid item xs={12} sm={2} marginTop={2}>
        <LabelText style={{ fontSize: 10 }}>Data nasci.</LabelText>
        <TextField
          size="small"
          id="dataNascimento" // Updated the id to match the correct property name
          fullWidth
          type="date"
          color="success"
          variant="standard"
          value={formularioDependente.dataNascimento} // Updated property name
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              dataNascimento: e.target.value,
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
