import logo from '../../assets/logo-unidigital-horizontal-verde.png'
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { Steps } from './components/Steps';
import { FormRegisterClientStore } from './store/FormRegisterClientStore';
import { CenteredContainer, ImgLogo } from "./styles";

export function FormRegisterClient() {
  const [step] = FormRegisterClientStore((state) => [state.step]);
  return (
    <CenteredContainer>
      <ImgLogo src={logo} />
      <Steps />
      {step === 0 && <StepOne />}
      {step === 1 && <StepTwo />}
    </CenteredContainer>
  )
}