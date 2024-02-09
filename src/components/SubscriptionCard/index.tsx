import { Typography } from "@mui/material";
import { ContainerCard, ContainerOne, ContainerThree, ContainerTwo, TruncatedText } from "./styles";

import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import Diversity1Icon from '@mui/icons-material/Diversity1';

type Props = {
  signture: SignatureProps,
  handleSelected: () => void;
  isSelected: boolean;
  icon: 'UNIDIGITAL_INIDIVIDUAL' | 'UNIDIGITAL_DUPLO' | 'UNIDIGITAL_FAMILIA'
}

type SignatureProps = {
  id: number;
  title: string;
  price: number;
  description: string;
}

export function SubscriptionCard({ signture, handleSelected, isSelected = false, icon }: Props) {
  return (
    <ContainerCard onClick={handleSelected} isSelected={isSelected}>
      <ContainerOne>
        {icon === 'UNIDIGITAL_INIDIVIDUAL' && <PersonIcon sx={{fontSize: 54}}/>}
        {icon === 'UNIDIGITAL_DUPLO' && <PeopleIcon sx={{fontSize: 54}}/>}
        {icon === 'UNIDIGITAL_FAMILIA' && <Diversity1Icon sx={{fontSize: 54}}/>}
        <TruncatedText sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {signture.title}
        </TruncatedText>
      </ContainerOne>
      <ContainerTwo>
        <Typography fontSize={12} sx={{ textAlign: 'center', textOverflow: 'ellipsis' }}>
          {signture.description}
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