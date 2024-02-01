import { Button, TextField, Typography } from '@mui/material';
import logo from '../../assets/logo-unidigital-horizontal-verde.png'
import { SubscriptionCard } from '../../components/SubscriptionCard';
import { Steps } from './components/Steps';
import { CenteredContainer, ContainerCupom, ContainerFooter, ContainerSubscription, ContainerText, ImgLogo } from "./styles";
import { ContainerDependentesComponent } from './components/ContainerDependentes';
import { CustomInput } from '../../components/Input';
import { CustomButton } from '../../components/Button';

export function FormRegisterClient() {
  return (
    <CenteredContainer>
      <ImgLogo src={logo} />
      <Steps />
      <ContainerSubscription>
        <SubscriptionCard />
      </ContainerSubscription>
      <ContainerText>
        <Typography fontSize={12} color='white'>
          Deseja adicionar mais dependentes ?
        </Typography>
      </ContainerText>
      <ContainerDependentesComponent />
      <ContainerText>
        <Typography fontSize={12} color='white'>
          Você  possui algum cupom de desconto?
        </Typography>
      </ContainerText>
      <ContainerCupom>
        <CustomInput type="text" size='small' variant="outlined" sx={{ width: 300 }} />
        <CustomButton sx={{marginLeft: 2}} color='success' variant='outlined'>Validar Cupom</CustomButton>
      </ContainerCupom>
      <ContainerFooter>
        <Typography fontSize={12} color='#28DA9D'>
          Cupom desconto 50,25 R$
        </Typography>
        <Typography fontSize={12} color='#28DA9D'>
          Total 50,25 R$
        </Typography>
      </ContainerFooter>
      <CustomButton variant='contained' sx={{ marginTop: 4 }}>
        <Typography fontSize={12} color='#fff'>
          Continuar
        </Typography>
      </CustomButton>
    </CenteredContainer>
  )
}