import { Button } from "@mui/material";
import styled from "styled-components";


export const CustomButton = styled(Button).attrs({
  color: 'success'
})`

  @media (max-width: 900px) {
    margin-top: 10px;
    margin-bottom: 10px;
    
    width: 80%
  }
`;