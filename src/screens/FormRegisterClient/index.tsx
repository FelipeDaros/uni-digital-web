import { Typography } from '@mui/material';
import logo from '../../assets/logo-unidigital-horizontal-verde.png'
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { Steps } from './components/Steps';
import { FormRegisterClientStore } from './store/FormRegisterClientStore';
import { CenteredContainer, ImgLogo } from "./styles";
import { CustomButton } from '../../components/Button';

export function FormRegisterClient() {
  const [handleNextStep, step, isLoading] = FormRegisterClientStore((state) => [state.handleNextStep, state.step, state.isLoading]);
  return (
    <CenteredContainer>
      <ImgLogo src={logo} />
      <Steps />
      {step === 0 && <StepOne />}
      {step === 1 && <StepTwo />}
      {step !== 1 && <CustomButton disabled={isLoading} variant='contained' color='success' onClick={handleNextStep} sx={{ marginLeft: 2 }}>
        <Typography fontWeight="bold" color="white">Pŕoximo</Typography>
      </CustomButton>}
    </CenteredContainer>
  )
}