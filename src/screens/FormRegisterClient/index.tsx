import logo from '../../assets/logo-unidigital-horizontal-verde.png'
import { StepTwo } from './components/StepTwo';
import { Steps } from './components/Steps';
import { CenteredContainer, ImgLogo } from "./styles";

export function FormRegisterClient() {
  return (
    <CenteredContainer>
      <ImgLogo src={logo} />
      <Steps />
      {/* <StepOne /> */}
      <StepTwo />
    </CenteredContainer>
  )
}