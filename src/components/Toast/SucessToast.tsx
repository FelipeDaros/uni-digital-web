import { Alert } from "@mui/material";
import styled from "styled-components";

type Props = {
  type?: 'warning' | 'error',
  state: boolean
}

const StyledToast = styled.div`
  position: fixed;
  bottom: 20px; /* Ajuste a distância do fundo conforme necessário */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* Ajuste a ordem de empilhamento conforme necessário */
`;

export function SucessToast({ state }: Props) {
  return (
    <>
      {state ? (
        <StyledToast>
          <Alert severity="success">
            This success Alert has a custom icon.
          </Alert>
        </StyledToast>
      ) : null}
    </>
  );
}
