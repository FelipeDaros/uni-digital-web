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
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import { StorePermissions } from "../../store/StorePermissions";

type SecundariosProps = {
  nome: string;
  documento: string;
  data_nascimento: Date | string;
  sexo: string;
  email: string;
}

type Props = {
  secundarios: SecundariosProps[];
  handleRemove: (user: SecundariosProps) => void;
}

export function DependentTable({ secundarios, handleRemove }: Props) {
  const [permissions] = StorePermissions((state) => [state.permissions]);

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
          {secundarios.map((row) => (
            <TableRow
              key={`${row.documento}` + `${row.nome}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <IconButton
                  onClick={() => handleRemove(row)}
                  size="small"
                  color="error"
                  disabled={!permissions.assinatura.find(item => item.tipo === "DELETAR")}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.documento}</TableCell>
              <TableCell align="right">{moment().format("DD/MM/YYYY")}</TableCell>
              <TableCell align="right">{row.sexo}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
