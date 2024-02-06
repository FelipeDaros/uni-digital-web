import { Typography } from "@mui/material";
import { ContainerCard, ContainerOne, ContainerThree, ContainerTwo, ImgLogoPlano, TruncatedText } from "./styles";

type Props = {
  signture: SignatureProps,
  handleSelected: () => void;
  isSelected: boolean;
}

type SignatureProps = {
  id: number;
  name: string;
  price: number;
  title: string;
}

export function SubscriptionCard({ signture, handleSelected, isSelected = false }: Props) {
  return (
    <ContainerCard onClick={handleSelected} isSelected={isSelected}>
      <ContainerOne>
        <ImgLogoPlano src="https://uploaddeimagens.com.br/images/004/728/559/original/logo-unidigital-horizontal-amarelo.png?1706790227" />
        <TruncatedText sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {signture.name}
        </TruncatedText>
      </ContainerOne>
      <ContainerTwo>
        <Typography fontSize={12} sx={{ textAlign: 'center', textOverflow: 'ellipsis' }}>
          {signture.title}
        </Typography>
      </ContainerTwo>
      <ContainerThree>
        <Typography fontSize={12} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {signture.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
        </Typography>
      </ContainerThree>
    </ContainerCard>
  )
}