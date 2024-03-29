import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore"

import DeleteIcon from '@mui/icons-material/Delete';

export function DependentTable() {
  const [secundarios, handleRemoveSecundarios] = FormRegisterClientStore(
    (state) => [state.secundarios, state.handleRemoveSecundarios],
  )

  return (
    <TableContainer>
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
          {secundarios.map((row) => (
            <TableRow
              key={`${row.documento}` + `${row?.nome}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <IconButton
                  onClick={() => handleRemoveSecundarios(row.documento)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row?.nome}
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
