import { TextField } from "@mui/material"
import styled from "styled-components"

export const TextFieldCustom = styled(TextField).attrs({
  size: "small",
})`
  width: 100%;
  border-color: "#A8B0B5";

  @media (max-width: 900px) {
    width: 80%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
