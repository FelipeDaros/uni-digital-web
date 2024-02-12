import { FormControl, Grid, TextField } from "@mui/material"

export function CreditCard() {
  return (
    <FormControl sx={{ marginTop: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField
            required
            size="small"
            id="titularName"
            name="titularName"
            label="Nome titular"
            fullWidth
            color="success"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            required
            size="small"
            id="numberCart"
            name="numberCart"
            label="Número"
            fullWidth
            color="success"
            variant="standard"
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <TextField
            required
            size="small"
            id="mouth"
            name="mouth"
            label="Mês"
            fullWidth
            color="success"
            variant="standard"
            inputProps={{ maxLength: 2 }}
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <TextField
            required
            size="small"
            id="year"
            name="year"
            label="Ano"
            fullWidth
            color="success"
            variant="standard"
            inputProps={{ maxLength: 2 }}
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <TextField
            required
            size="small"
            id="cvc"
            name="cvc"
            label="CVC"
            fullWidth
            color="success"
            variant="standard"
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
      </Grid>
    </FormControl>
  )
}
