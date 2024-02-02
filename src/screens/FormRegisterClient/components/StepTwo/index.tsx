import { Avatar, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { CenteredContainer, LabelText } from "./style";
import { DependentTable } from "./DependentTable";
import AddIcon from '@mui/icons-material/Add';
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore";
import { useState } from "react";
import { ErrorToast } from "../../../../components/Toast/ErrorToast";

type DependetesProps = {
  nome: string;
  documento: string;
  dataNascimento: Date | any;
  email: string;
  sexo: string;
}

export function StepTwo() {
  const [error, setError] = useState({
    message: "",
    state: false
  });

  const [formularioDependente, setFormularioDependente] = useState<DependetesProps>({} as DependetesProps);
  const [formulario, updateFormulario, handleAddDependente] = FormRegisterClientStore((state) => [
    state.formulario,
    state.updateFormulario,
    state.handleAddDependente
  ]);

  function handleAdd() {
    if (!formularioDependente.nome || !formularioDependente.documento || !formularioDependente.dataNascimento || !formularioDependente.sexo || !formularioDependente.email) {
      setError({
        message: 'Informe todos os campos para adicionar dependente',
        state: true
      });
      return;
    }

    handleAddDependente(formularioDependente);
    //@ts-ignore
    setFormularioDependente({
      dataNascimento: "",
      documento: "",
      email: "",
      nome: "",
      sexo: ""
    });
  }

  return (
    <CenteredContainer>
      <Typography fontSize={12} sx={{ marginTop: 3, textAlign: 'center' }}>
        O titular é a pessoa responsável pelo aceite do contrato e pelo pagamento das mensalidades da Telemedicina Unimed.
      </Typography>
      <Avatar sx={{ width: 56, height: 56, marginTop: 6 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Nome</LabelText>
          <TextField
            required
            size="small"
            id="nome"
            name="nome"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.nome}
            onChange={value => updateFormulario("nome", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Data nascimento</LabelText>
          <TextField
            required
            size="small"
            id="dataNascimento"
            name="dataNascimento"
            placeholder="Data"
            fullWidth
            type="date"
            color="success"
            variant="standard"
            value={formulario?.dataNascimento}
            onChange={value => updateFormulario("dataNascimento", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">CPF/CNPJ</LabelText>
          <TextField
            required
            size="small"
            id="documento"
            name="documento"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.documento}
            onChange={value => updateFormulario("documento", value.target.value)}
          />
        </Grid>
      </Grid>
      <Typography fontWeight="bold" sx={{ marginTop: 6 }}>Contato</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Fone</LabelText>
          <TextField
            required
            size="small"
            id="fone"
            name="fone"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.fone}
            onChange={value => updateFormulario("fone", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Celular</LabelText>
          <TextField
            required
            size="small"
            id="celular"
            name="celular"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.celular}
            onChange={value => updateFormulario("celular", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">E-mail</LabelText>
          <TextField
            type="email"
            required
            size="small"
            id="email"
            name="email"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.email}
            onChange={value => updateFormulario("email", value.target.value)}
          />
        </Grid>
      </Grid>
      <Typography fontWeight="bold" sx={{ marginTop: 6 }}>Endereço</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Cep</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="cep"
            name="cep"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.cep}
            onChange={value => updateFormulario("cep", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Endereço</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="endereco"
            name="endereco"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.endereco}
            onChange={value => updateFormulario("endereco", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Número</LabelText>
          <TextField
            type="number"
            required
            size="small"
            id="numero"
            name="numero"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.numero}
            onChange={value => updateFormulario("numero", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Bairro</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="bairro"
            name="bairro"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.bairro}
            onChange={value => updateFormulario("bairro", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Cidade</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="cidade"
            name="cidade"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.cidade}
            onChange={value => updateFormulario("cidade", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">UF</LabelText>
          {/* <Select
            type="text"
            required
            size="small"
            id="uf"
            name="uf"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.uf || ''}
            onChange={value => updateFormulario("uf", value.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select> */}
        </Grid>
      </Grid>
      <Typography fontWeight="bold" sx={{ marginTop: 6 }}>Credenciais</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Senha</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="senha"
            name="senha"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.senha}
            onChange={value => updateFormulario("senha", value.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} marginTop={2}>
          <LabelText htmlFor="">Confirmar senha</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="confirmarSenha"
            name="confirmarSenha"
            fullWidth
            color="success"
            variant="standard"
            value={formulario?.confirmarSenha}
            onChange={value => updateFormulario("confirmarSenha", value.target.value)}
          />
        </Grid>
      </Grid>
      <Typography fontWeight="bold" sx={{ marginTop: 6 }}>Dependentes</Typography>
      <Grid container spacing={3} direction="row">
        <Grid item xs={12} sm={3} marginTop={2}>
          <LabelText htmlFor="">Nome</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="nome"
            name="nome"
            fullWidth
            color="success"
            variant="standard"
            value={formularioDependente.nome}
            onChange={(e) => setFormularioDependente((state) => ({ ...state, nome: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={2}>
          <LabelText htmlFor="">CPF</LabelText>
          <TextField
            type="text"
            required
            size="small"
            id="documento"
            name="documento"
            fullWidth
            color="success"
            variant="standard"
            value={formularioDependente.documento}
            onChange={(e) => setFormularioDependente((state) => ({ ...state, documento: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={2}>
          <LabelText style={{ fontSize: 10 }}>Data nasci.</LabelText>
          <TextField
            required
            size="small"
            id="datanascimento"
            name="datanascimento"
            fullWidth
            type="date"
            color="success"
            variant="standard"
            value={formularioDependente.dataNascimento}
            onChange={(e) => setFormularioDependente((state) => ({ ...state, dataNascimento: e.target.value as any }))}
          />
        </Grid>
        <Grid item xs={12} sm={2} marginTop={2}>
          <LabelText htmlFor="">Sexo</LabelText>
          <Select
            type="text"
            required
            size="small"
            id="sexo"
            name="sexo"
            fullWidth
            color="success"
            variant="standard"
            value={formularioDependente.sexo}
            onChange={(e) => setFormularioDependente((state) => ({ ...state, sexo: e.target.value }))}
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
            required
            size="small"
            id="email"
            name="email"
            fullWidth
            color="success"
            variant="standard"
            value={formularioDependente.email}
            onChange={(e) => setFormularioDependente((state) => ({ ...state, email: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} sm={1} marginTop={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconButton onClick={handleAdd} size="small" sx={{ backgroundColor: '#28DA9D' }}>
            <AddIcon color="primary" sx={{ fontSize: 16 }} />
          </IconButton>
        </Grid>
      </Grid>
      <DependentTable />
      <ErrorToast erro={error} />
    </CenteredContainer >
  )
}