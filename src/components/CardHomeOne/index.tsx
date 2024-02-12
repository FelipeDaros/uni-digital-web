import { Typography } from "@mui/material"
import styled from "styled-components"

const ContainerCard = styled.div`
  width: 350px;
  max-width: 350px;
  height: 150px;
  max-height: 150px;
  background-color: #28da9d;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  margin: 2px;
  padding: 10px;
`

type Props = {
  nome: string
}

export function CardHomeOne({ nome }: Props) {
  return (
    <ContainerCard>
      <Typography sx={{ fontSize: 18 }} color="white">
        Olá <strong>{nome}</strong> Bem vindo ao Portal UniDigital!
      </Typography>
    </ContainerCard>
  )
}
