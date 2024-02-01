import { CustomButton as CustomButtonStyled } from "./styles";
import { ButtonProps } from '@mui/material'

type Props = ButtonProps & {}

export function CustomButton({ ...rest }: Props) {
  return (<CustomButtonStyled {...rest} />)
}