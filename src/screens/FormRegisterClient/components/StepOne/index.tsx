import { OutlinedInput, Typography } from "@mui/material"
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
import { useState } from "react"
import { ICupom } from "../../../../interfaces/ICupom"

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { api } from "../../../../config/api"
import { useToast } from "../../../../context/ToastContext"

export function StepOne() {
  const { showToast } = useToast();
  const [codigo, setCodigo] = useState("");
  const [stateModalCupom, setStateModalCupom] = useState(false);
  const [step, handleNextStep, product, total, handleSelectCupom, totalDependets, setValorTotal, cupom, handleLoading] = FormRegisterClientStore(
    (state) => [
      state.step,
      state.handleNextStep,
      state.product,
      state.total,
      state.handleSelectCupom,
      state.totalDependets,
      state.setValorTotal,
      state.cupom,
      state.handleLoading
    ],
  )

  const handleStateModalCupom = () => setStateModalCupom(!stateModalCupom);

  async function handleCupom() {
    if (!codigo.trim()) {
      setCodigo("");
      return;
    }

    try {
      handleLoading()
      const { data } = await api.get(`/cupons/show/${codigo}`);
      const cupom = data.data;
      if (!cupom) {

        showToast({
          color: 'warning',
          message: 'Cupom não encontrado.'
        });
        setCodigo("")
        return
      }

      handleSelectCupom(cupom);
      calculoAssinaturaComDesconto(cupom);
      handleStateModalCupom()
    } catch (error: any) {
      showToast({
        color: 'error',
        message: error.response.data.message
      });
    } finally {
      handleLoading()
    }
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
          // @ts-ignore
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
      <ContainerDependentesComponent limit={product?.qtd_secundario_padrao} />
      <ContainerText>
        <Typography fontSize={12} color="white">
          Você possui algum cupom de desconto?
        </Typography>
      </ContainerText>
      <ContainerCupom>
        <OutlinedInput
          id="outlined-adornment-weight"
          endAdornment={<ConfirmationNumberIcon color="success" />}
          aria-describedby="outlined-weight-helper-text"
          color="success"
          size="small"
          onBlur={handleCupom}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleCupom();
            }
          }}
          onChange={e => setCodigo(e.target.value)}
          value={codigo}
          placeholder="Insira o código"
          inputProps={{
            'aria-label': 'weight',
          }}
        />
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
    </CenteredContainer>
  )
}
