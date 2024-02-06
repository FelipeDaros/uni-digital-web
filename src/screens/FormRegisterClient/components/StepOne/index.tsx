import { TextField, Typography } from "@mui/material";
import { SubscriptionCard } from "../../../../components/SubscriptionCard";
import { CenteredContainer, ContainerCupom, ContainerFooter, ContainerSubscription, ContainerText } from "./styles";
import { ContainerDependentesComponent } from "./ContainerDependentes";
import { CustomButton } from "../../../../components/Button";
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore";

type SignatureProps = {
  id: number;
  name: string;
  price: number;
  title: string;
}

const signaturePlans: SignatureProps[] = [
  { id: 1, name: "Plano Básico", price: 100.25, title: 'lorem' },
  { id: 2, name: "Plano Standard", price: 450.2, title: 'teste' },
  { id: 3, name: "Plano Premium", price: 1323.3, title: 'BEBEBE' },
  { id: 4, name: "Plano", price: 200, title: 'TATA' },
  { id: 5, name: "Plano B", price: 500, title: 'TETE' },
  // Adicione mais planos conforme necessário
]

export function StepOne() {
  const [signature, isLoading, handleSelectedSignature] = FormRegisterClientStore((state) => [state.signature, state.isLoading, state.handleSelectedSignature]);

  function SignatureSelected(dados: SignatureProps) {
    handleSelectedSignature(dados);
  }

  console.log(signature)

  return (
    <CenteredContainer>
      <ContainerSubscription>
        {signaturePlans.map(item => (
          <SubscriptionCard key={item.id} signture={item} handleSelected={() => SignatureSelected(item)} isSelected={item.id === signature.id} />
        ))}
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