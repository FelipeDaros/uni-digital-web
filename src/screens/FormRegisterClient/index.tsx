import logo from '../../assets/logo-unidigital-horizontal-verde.png'
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { Steps } from './components/Steps';
import { FormRegisterClientStore } from './store/FormRegisterClientStore';
import { CenteredContainer, ImgLogo } from "./styles";

export function FormRegisterClient() {
  const [isLoading, setIsLoading] = FormRegisterClientStore((state) => [state.isLoading, state.setIsLoading]);
  
  return (
    <CenteredContainer>
      <ImgLogo src={logo} />
      <Steps />
      {/* <StepOne /> */}
      <StepTwo />
    </CenteredContainer>
  )
}