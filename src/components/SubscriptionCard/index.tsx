import { Typography } from "@mui/material"
import {
  ContainerCard,
  ContainerOne,
  ContainerThree,
  ContainerTwo,
  TruncatedText,
} from "./styles"

import PersonIcon from "@mui/icons-material/Person"
import PeopleIcon from "@mui/icons-material/People"
import Diversity1Icon from "@mui/icons-material/Diversity1"
import { IProduct } from "../../interfaces/IProduct"

type Props = {
  produto: IProduct,
  handleSelected: () => void
  icon: "UNIDIGITAL_INIDIVIDUAL" | "UNIDIGITAL_DUPLO" | "UNIDIGITAL_FAMILIA"
}

export function SubscriptionCard({
  produto,
  icon,
}: Props) {
  return (
    <ContainerCard>
      <ContainerOne>
        {icon === "UNIDIGITAL_INIDIVIDUAL" && (
          <PersonIcon sx={{ fontSize: 54 }} />
        )}
        {icon === "UNIDIGITAL_DUPLO" && <PeopleIcon sx={{ fontSize: 54 }} />}
        {icon === "UNIDIGITAL_FAMILIA" && (
          <Diversity1Icon sx={{ fontSize: 54 }} />
        )}
        <TruncatedText sx={{ textAlign: "center", fontWeight: "bold" }}>
          {produto.nome}
        </TruncatedText>
      </ContainerOne>
      <ContainerTwo>
        <Typography
          fontSize={12}
          sx={{ textAlign: "center", textOverflow: "ellipsis" }}
        >
          {produto.descricao}
        </Typography>
      </ContainerTwo>
      <ContainerThree>
        <Typography
          fontSize={12}
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          {/* @ts-ignore */}
          {String(produto.preco).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
      </ContainerThree>
    </ContainerCard>
  )
}
