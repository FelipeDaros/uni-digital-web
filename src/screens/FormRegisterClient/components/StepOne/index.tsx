import { TextField, Typography } from "@mui/material"
import { SubscriptionCard } from "../../../../components/SubscriptionCard"
import {
  CenteredContainer,
  ContainerCupom,
  ContainerFooter,
  ContainerSubscription,
  ContainerText,
} from "./styles"
import { ContainerDependentesComponent } from "./ContainerDependentes"
import { CustomButton } from "../../../../components/Button"
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore"

type SignatureProps = {
  id: number
  name: string
  price: number
  title: string
}

const signaturePlans: SignatureProps = {
  id: 1,
  name: "Plano Básico",
  price: 100.25,
  title: "lorem",
}

export function StepOne() {
  const [step, handleNextStep] = FormRegisterClientStore(
    (state) => [state.step, state.handleNextStep],
  )


  function SignatureSelected(dados: SignatureProps) {

  }

  return (
    <CenteredContainer>
      <ContainerSubscription>
        <SubscriptionCard
          icon="UNIDIGITAL_INIDIVIDUAL"
          signture={signaturePlans}
          handleSelected={() => SignatureSelected(signaturePlans)}
          isSelected={true}
        />
      </ContainerSubscription>
      <ContainerText>
        <Typography fontSize={12} color="white">
          Deseja adicionar mais dependentes ?
        </Typography>
      </ContainerText>
      <ContainerDependentesComponent />
      <ContainerText>
        <Typography fontSize={12} color="white">
          Você possui algum cupom de desconto?
        </Typography>
      </ContainerText>
      <ContainerCupom>
        <TextField
          name="cupom"
          type="text"
          size="small"
          variant="outlined"
          sx={{ width: 300 }}
        />
        <CustomButton
          sx={{ marginLeft: 2 }}
          color="success"
          variant="outlined"
        >
          Validar Cupom
        </CustomButton>
      </ContainerCupom>
      <ContainerFooter>
        <Typography fontSize={14} color="#28DA9D">
          Cupom desconto <strong> R$</strong>
        </Typography>
        <Typography fontSize={14} color="#28DA9D">
          Total <strong> R$</strong>
        </Typography>
      </ContainerFooter>
      {step !== 1 && (
        <CustomButton
          variant="contained"
          color="success"
          onClick={handleNextStep}
          sx={{ marginLeft: 2 }}
        >
          <Typography fontWeight="bold" color="white">
            Pŕoximo
          </Typography>
        </CustomButton>
      )}
    </CenteredContainer>
  )
}
