import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";

const ContainerCard = styled.div`
  width: 350px;
  height: 150px;
  background-color: #28DA9D;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 2px;
  padding: 10px;
`;

type Props = {
  valor: number;
  data: string;
};

export function CardHomeTwo({ valor, data }: Props) {
  return (
    <ContainerCard>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Box>
          <Typography sx={{ fontSize: 20 }} color="white">
            Próxima cobrança
          </Typography>
          <Typography sx={{ fontSize: 20, marginTop: 2 }} color="white">
            {data}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 24 }} color="white">
          {valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Typography>
      </Stack>
    </ContainerCard>
  );
}
