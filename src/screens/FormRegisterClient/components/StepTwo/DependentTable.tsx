import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove"
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore"

export function DependentTable() {
  const [dependentes, handleRemoveDependente] = FormRegisterClientStore(
    (state) => [state.dependentes, state.handleRemoveDependente],
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>...</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="right">CPF</TableCell>
            <TableCell align="right">Data Nasc.</TableCell>
            <TableCell align="right">Sexo</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dependentes.map((row) => (
            <TableRow
              key={`${row.documento}` + `${row.nome}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <IconButton
                  onClick={() => handleRemoveDependente(row.documento)}
                  size="small"
                  sx={{ backgroundColor: "#28DA9D" }}
                >
                  <RemoveIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.documento}</TableCell>
              <TableCell align="right">{row.dataNascimento}</TableCell>
              <TableCell align="right">{row.sexo}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
