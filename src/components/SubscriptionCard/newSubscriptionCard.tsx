import { Grid, Paper, Typography } from "@mui/material";
import { IProduct } from "../../interfaces/IProduct";

import PersonIcon from "@mui/icons-material/Person"
import PeopleIcon from "@mui/icons-material/People"
import Diversity1Icon from "@mui/icons-material/Diversity1"
import { TruncatedText } from "./styles";

type Props = {
  produto: IProduct,
  handleSelected: () => void
  icon: "UNIDIGITAL_INIDIVIDUAL" | "UNIDIGITAL_DUPLO" | "UNIDIGITAL_FAMILIA",
  isSelected: boolean;
}

export function NewSubscriptionCard({
  produto,
  icon,
  isSelected,
  handleSelected
}: Props) {
  return (
    <Grid container border={2} borderColor={isSelected ? "#26DA9C" : "gray"} mt={1} component={Paper} onClick={handleSelected}>
      <Grid
        item
        xs={2}
        sx={{ backgroundColor: '#f0fff9', height: '100px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {icon === "UNIDIGITAL_INIDIVIDUAL" && (
          <PersonIcon sx={{ fontSize: 48 }} />
        )}
        {icon === "UNIDIGITAL_DUPLO" && <PeopleIcon sx={{ fontSize: 48 }} />}
        {icon === "UNIDIGITAL_FAMILIA" && (
          <Diversity1Icon sx={{ fontSize: 48 }} />
        )}
        <TruncatedText sx={{ textAlign: "center", fontWeight: "bold" }}>
          {produto?.nome}
        </TruncatedText>
      </Grid>
      <Grid
        item
        xs={7.8}
        display="flex"
        alignItems="start"
        justifyContent="center"
        flexDirection="column"
        p={1}
      >
        <Typography
          fontSize={12}
          sx={{ textAlign: "center", textOverflow: "ellipsis" }}
        >
          {produto?.descricao}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        display="flex"
        alignItems="start"
        justifyContent="center"
        flexDirection="column"
        p={1}
      >
        <Typography
          fontSize={12}
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          {/* @ts-ignore */}
          {Number(produto?.preco).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
      </Grid>
    </Grid>
  )
}