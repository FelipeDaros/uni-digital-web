import { TextField, Typography } from "@mui/material";
import { SubscriptionCard } from "../../../../components/SubscriptionCard";
import { CenteredContainer, ContainerCupom, ContainerFooter, ContainerSubscription, ContainerText } from "./styles";
import { ContainerDependentesComponent } from "./ContainerDependentes";
import { CustomButton } from "../../../../components/Button";
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore";

export function StepOne() {
  const [signature, isLoading] = FormRegisterClientStore((state) => [state.signature, state.isLoading]);
  return (
    <CenteredContainer>
      <ContainerSubscription>
        <SubscriptionCard />
      </ContainerSubscription>
      <ContainerText>
        <Typography fontSize={12} color='white'>
          Deseja adicionar mais dependentes ?
        </Typography>
      </ContainerText>
      <ContainerDependentesComponent dependents={signature?.dependents} />
      <ContainerText>
        <Typography fontSize={12} color='white'>
          Você  possui algum cupom de desconto?
        </Typography>
      </ContainerText>
      <ContainerCupom>
        <TextField name="cupom" type="text" size='small' variant="outlined" sx={{ width: 300 }} />
        <CustomButton disabled={isLoading} sx={{ marginLeft: 2 }} color='success' variant='outlined'>Validar Cupom</CustomButton>
      </ContainerCupom>
      <ContainerFooter>
        <Typography fontSize={14} color='#28DA9D'>
          Cupom desconto <strong>{signature?.discount} R$</strong>
        </Typography>
        <Typography fontSize={14} color='#28DA9D'>
          Total <strong>{signature?.total} R$</strong>
        </Typography>
      </ContainerFooter>
    </CenteredContainer>
  )
}