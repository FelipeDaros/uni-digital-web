import { Box, Stack, Typography } from "@mui/material"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../../context/AuthContext"

const ContainerCard = styled.div`
  width: 350px;
  max-width: 350px;
  height: 150px;
  max-height: 150px;
  background-color: #28da9d;
  border-radius: 10px;
  margin: 2px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

const BoxContaienr = styled.div`
  background-color: #317267;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 10px;
`

type Props = {
  nome_produto: string;
  nome: string;
  codigo: string;
  data_nascimento: Date;
}

export function VirtualCard({ codigo, nome, data_nascimento, nome_produto }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <ContainerCard onClick={() => navigate(`/signature/${user.user.id}`)}>
      <BoxContaienr>
        <Typography sx={{ fontSize: 18, paddingLeft: 1 }} color="white">
          {nome_produto}
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
            Código: <strong>{codigo}</strong>
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="white">
            Nome: {nome}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="white">
            Data Nasc: {moment(data_nascimento).format(`DD/MM/YYYY`)}
          </Typography>
        </Box>
        <Box>
          <p></p>
        </Box>
      </Stack>
    </ContainerCard>
  )
}
