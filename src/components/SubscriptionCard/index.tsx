import { Typography } from "@mui/material";
import { ContainerCard, ContainerOne, ContainerThree, ContainerTwo, ImgLogoPlano, TruncatedText } from "./styles";

export function SubscriptionCard() {
  return (
    <ContainerCard>
      <ContainerOne>
        <ImgLogoPlano src="https://uploaddeimagens.com.br/images/004/728/559/original/logo-unidigital-horizontal-amarelo.png?1706790227" />
        <TruncatedText sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Assinatura tipo 2 sdasdasdasdasdasdas
        </TruncatedText>
      </ContainerOne>
      <ContainerTwo>
        <Typography fontSize={12} sx={{ textAlign: 'center', textOverflow: 'ellipsis' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ex a repellat similique, error eius velit harum voluptas delectus aut, necessitatibus laudantium. Laudantium ab, aliquid rerum maxime ratione neque possimus.
        </Typography>
      </ContainerTwo>
      <ContainerThree>
        <Typography fontSize={12} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          R$ 49,90
        </Typography>
      </ContainerThree>
    </ContainerCard>
  )
}