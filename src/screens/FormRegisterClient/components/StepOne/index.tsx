import { Typography } from "@mui/material"
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
import { ICupom } from "../../../../interfaces/ICupom"

export function StepOne() {
  const [stateModalCupom, setStateModalCupom] = useState(false);
  const [step, handleNextStep, product, total, handleSelectCupom, totalDependets, setValorTotal, cupom] = FormRegisterClientStore(
    (state) => [
      state.step,
      state.handleNextStep,
      state.product,
      state.total,
      state.handleSelectCupom,
      state.totalDependets,
      state.setValorTotal,
      state.cupom
    ],
  )

  const handleStateModalCupom = () => setStateModalCupom(!stateModalCupom);

  function handleCupom(data: any) {
    const cupom = data.row as ICupom;
    console.log(cupom)
    handleSelectCupom(cupom);
    calculoAssinaturaComDesconto(cupom);
    handleStateModalCupom()
  }

  function calculoAssinaturaComDesconto(cupom: ICupom) {
    let valorPorDependente = 0;

    if (product.tipo === "PF" && product.add_secundarios === 1) {
      if (totalDependets >= 1) {
        valorPorDependente = 10;
        // @ts-ignore
        let calculo = (totalDependets * parseFloat(valorPorDependente)) + parseFloat(product.preco);

        if (cupom.tipo === 'VALOR_TOTAL') {
          calculo = calculo - cupom.valor;
        }

        if (cupom.tipo === 'PORCENTAGEM') {
          let desconto = (cupom.valor / 100) * calculo; // Calcula o valor do desconto
          calculo = calculo - desconto; // Subtrai o desconto do cálculo original
        }
        setValorTotal(calculo);
      }
    }

    if (product.tipo === "PJ" && product.add_secundarios === 1) {
      if (totalDependets >= 1 && totalDependets <= 10) {
        valorPorDependente = 27.90;
        // @ts-ignore
        let calculo = (totalDependets * parseFloat(valorPorDependente)) + parseFloat(product.preco);

        if (cupom.tipo === 'VALOR_TOTAL') {
          calculo = calculo - cupom.valor;
        }

        if (cupom.tipo === 'PORCENTAGEM') {
          let desconto = (cupom.valor / 100) * calculo; // Calcula o valor do desconto
          calculo = calculo - desconto; // Subtrai o desconto do cálculo original
        }
        setValorTotal(calculo);
      }
      if (totalDependets >= 11 && totalDependets <= 29) {
        valorPorDependente = 26;
        // @ts-ignore
        let calculo = (totalDependets * parseFloat(valorPorDependente)) + parseFloat(product.preco);

        if (cupom.tipo === 'VALOR_TOTAL') {
          calculo = calculo - cupom.valor;
        }

        if (cupom.tipo === 'PORCENTAGEM') {
          let desconto = (cupom.valor / 100) * calculo; // Calcula o valor do desconto
          calculo = calculo - desconto; // Subtrai o desconto do cálculo original
        }
        setValorTotal(calculo);
      }

      if (totalDependets >= 30) {
        valorPorDependente = 23.72;
        // @ts-ignore
        let calculo = (totalDependets * parseFloat(valorPorDependente)) + parseFloat(product.preco);

        if (cupom.tipo === 'VALOR_TOTAL') {
          calculo = calculo - cupom.valor;
        }

        if (cupom.tipo === 'PORCENTAGEM') {
          let desconto = (cupom.valor / 100) * calculo; // Calcula o valor do desconto
          calculo = calculo - desconto; // Subtrai o desconto do cálculo original
        }
        setValorTotal(calculo);
      }
    }
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
      <ContainerDependentesComponent limit={product.qtd_secundario_padrao} />
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
          Cupom desconto <strong>{cupom?.valor}   {cupom?.tipo === 'PORCENTAGEM' ? '%' : 'R$'}</strong>
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
