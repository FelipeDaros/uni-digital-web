import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
import styled from "styled-components";

type Props = {
  erro: ErrorProps
}

type ErrorProps = {
  state: boolean,
  message: string
}

const StyledToast = styled.div`
  position: fixed;
  bottom: 20px; /* Ajuste a distância do fundo conforme necessário */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* Ajuste a ordem de empilhamento conforme necessário */
`;

export function ErrorToast({ erro }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (erro.state) {
      setVisible(true);

      // Configurando o temporizador para esconder o toast após 3000 milissegundos (3 segundos)
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      // Limpando o temporizador ao desmontar o componente
      return () => clearTimeout(timer);
    }
  }, [erro.state]);

  return (
    <>
      {visible && (
        <StyledToast>
          <Alert severity="error">{erro.message}</Alert>
        </StyledToast>
      )}
    </>
  );
}
