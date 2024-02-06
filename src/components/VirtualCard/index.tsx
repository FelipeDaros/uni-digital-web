import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";

const ContainerCard = styled.div`
  width: 350px;
  max-width: 350px;
  height: 150px;
  max-height: 150px;
  background-color: #28DA9D;
  border-radius: 10px;
  margin: 2px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const BoxContaienr = styled.div`
  background-color: #317267;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 10px;
`

export function VirtualCard() {
  return (
    <ContainerCard>
      <BoxContaienr>
        <Typography sx={{ fontSize: 18, paddingLeft: 1 }} color="white">
          Nome do plano
        </Typography>
      </BoxContaienr>
      <Stack
        sx={{ mt: 1 }}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={6}
      >
        <Box>
          <Typography sx={{ fontSize: 16 }} color="white">
            Código: <strong>4675.2342.3424</strong>
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="white">
            Nome: Felipe Daros
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="white">
            Data Nasc: 02/06/1998
          </Typography>
        </Box>
        <Box>
          <p>TESTE</p>
        </Box>
      </Stack>
    </ContainerCard>
  )
}