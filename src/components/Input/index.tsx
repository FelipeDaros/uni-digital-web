import { TextFieldProps } from "@mui/material";
import { TextFieldCustom } from "./styles";

type Props = TextFieldProps & {}

export function CustomInput({ ...rest }: Props) {
  return (<TextFieldCustom {...rest}/>)
}