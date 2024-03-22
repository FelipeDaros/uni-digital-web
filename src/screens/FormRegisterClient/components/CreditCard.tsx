import { FormControl, Grid, TextField } from "@mui/material"
import { LabelText } from "./StepTwo/style"
import { useState } from "react"
import { FormRegisterClientStore } from "../store/FormRegisterClientStore";
import { ICartao } from "../../../interfaces/ICartao";

export function CreditCard() {
  const [handleAddCartao] = FormRegisterClientStore(
    (state) => [state.handleAddCartao],
  )
  const [formularioCartao, setFormularioCartao] = useState<ICartao>({
    nomeTitular: "",
    numero: "",
    vencimento: "",
    cvc: ""
  });

  function handleCartao() {
    handleAddCartao(formularioCartao);
  }

  return (
    <FormControl sx={{ marginTop: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Grid>
            <LabelText>Nome titular</LabelText>
          </Grid>
          <TextField
            required
            size="small"
            id="nomeTitularName"
            name="nomeTitularName"
            fullWidth
            color="success"
            variant="standard"
            value={formularioCartao?.nomeTitular}
            onChange={(e) =>
              setFormularioCartao((state) => ({
                ...state,
                nomeTitular: e.target.value,
              }))
            }
            onBlur={handleCartao}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid>
            <LabelText>Número</LabelText>
          </Grid>
          <TextField
            required
            size="small"
            id="numberCart"
            name="numberCart"
            fullWidth
            color="success"
            variant="standard"
            value={formularioCartao.numero}
            onChange={(e) =>
              setFormularioCartao((state) => ({
                ...state,
                numero: e.target.value,
              }))
            }
            onBlur={handleCartao}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <Grid>
            <LabelText>Vencimento</LabelText>
          </Grid>
          <TextField
            required
            size="small"
            id="date"
            name="date"
            fullWidth
            color="success"
            variant="standard"
            inputProps={{ maxLength: 2 }}
            type="date"
            value={formularioCartao.vencimento}
            onChange={(e) =>
              setFormularioCartao((state) => ({
                ...state,
                vencimento: e.target.value,
              }))
            }
            onBlur={handleCartao}
          />
        </Grid>
        <Grid item xs={3} md={1}>
          <Grid>
            <LabelText>CVC</LabelText>
          </Grid>
          <TextField
            required
            size="small"
            id="cvc"
            name="cvc"
            fullWidth
            color="success"
            variant="standard"
            inputProps={{ maxLength: 3 }}
            value={formularioCartao.cvc}
            onChange={(e) =>
              setFormularioCartao((state) => ({
                ...state,
                cvc: e.target.value,
              }))
            }
            onBlur={handleCartao}
          />
        </Grid>
      </Grid>
    </FormControl>
  )
}
