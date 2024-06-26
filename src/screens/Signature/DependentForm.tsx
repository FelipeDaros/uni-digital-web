import { Grid, IconButton, MenuItem, Select, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"
import { LabelText } from "../FormRegisterClient/components/StepTwo/style"
import { handleKeyPress } from "../../utils/handleKeyPress"
import { useToast } from "../../context/ToastContext"
import { StorePermissions } from "../../store/StorePermissions"

type SecundariosProps = {
  nome: string;
  documento: string;
  data_nascimento: Date | string;
  sexo: string;
  email: string;
}

type Props = {
  handleAddDependente: (dependente: SecundariosProps) => void;
}

export function DependentForm({ handleAddDependente }: Props) {
  const [permissions] = StorePermissions((state) => [state.permissions]);

  const { showToast } = useToast();
  const [formularioDependente, setFormularioDependente] = useState({
    nome: "",
    documento: "",
    data_nascimento: "",
    email: "",
    sexo: "",
  })

  function handleAdd() {
    if(!formularioDependente.nome.trim() || !formularioDependente.email.trim() || !formularioDependente.documento.trim() || !formularioDependente.sexo.trim() || !formularioDependente.data_nascimento.trim()){
      return showToast({
        color: 'error',
        message: 'Informe todos os campos!'
      })
    }

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
          onChange={(e) =>
            setFormularioDependente((state) => ({
              ...state,
              documento: e.target.value,
            }))
          }
          onKeyPress={handleKeyPress}
          inputProps={{ maxLength: 11 }}
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
          disabled={!permissions.assinatura.find(item => item.tipo === "EDITAR")}
        >
          <AddIcon color="primary" sx={{ fontSize: 16 }} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
