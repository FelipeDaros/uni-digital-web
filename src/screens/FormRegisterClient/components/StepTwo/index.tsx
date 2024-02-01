import { Avatar, Grid, TextField, Typography } from "@mui/material";
import { CenteredContainer } from "./style";


export function StepTwo() {
  return (
    <CenteredContainer>
      <Typography fontSize={12} sx={{ marginTop: 3, textAlign: 'center' }}>
        O titular é a pessoa responsável pelo aceite do contrato e pelo pagamento das mensalidades da Telemedicina Unimed.
      </Typography>
      <Avatar sx={{ width: 56, height: 56, marginTop: 6 }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nome"
            name="nome"
            label="Nome"
            fullWidth
            color="success"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label htmlFor="">Data nascimento</label>
          <TextField
            required
            id="datanascimento"
            name="datanascimento"
            placeholder="Data"
            fullWidth
            type="date"
            color="success"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="documento"
            name="documento"
            label="CPF/CNPJ"
            fullWidth
            color="success"
            variant="standard"
          />
        </Grid>
      </Grid>
    </CenteredContainer>
  )
}