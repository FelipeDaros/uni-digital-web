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
import { ModalCupom } from "../../../../components/ModalCupom"
import { useState } from "react"

export function StepOne() {
  const [stateModalCupom, setStateModalCupom] = useState(false);
  const [step, handleNextStep, product, total] = FormRegisterClientStore(
    (state) => [state.step, state.handleNextStep, state.product, state.total],
  )

  const handleStateModalCupom = () => setStateModalCupom(!stateModalCupom);

  function handleCupom(cupom: any){
    console.log(cupom)
    handleStateModalCupom()
  }

  return (
    <CenteredContainer>
      <ContainerSubscription>
        <SubscriptionCard
          produto={product}
          icon="UNIDIGITAL_INIDIVIDUAL"
        />
      </ContainerSubscription>
      <ContainerText>
        <Typography fontSize={12} color="white">
          Deseja adicionar mais dependentes ?
        </Typography>
      </ContainerText>
      {/* @ts-ignore */}
      <ContainerDependentesComponent limit={product.qtd_secundario_padrao}/>
      <ContainerText>
        <Typography fontSize={12} color="white">
          Você possui algum cupom de desconto?
        </Typography>
      </ContainerText>
      <ContainerCupom>
        <CustomButton
          sx={{ marginLeft: 2 }}
          color="success"
          variant="outlined"
          onClick={handleStateModalCupom}
        >
          Selecionar cupom
        </CustomButton>
      </ContainerCupom>
      <ContainerFooter>
        <Typography fontSize={14} color="#28DA9D">
          Cupom desconto <strong> R$</strong>
        </Typography>
        <Typography fontSize={14} color="#28DA9D">
          Total <strong>{total.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })} </strong>
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
      <ModalCupom 
        isState={stateModalCupom}
        onOk={handleCupom}
        changeState={handleStateModalCupom}
      />
    </CenteredContainer>
  )
}
