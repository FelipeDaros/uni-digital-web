import { IconButton, TextField, Typography } from "@mui/material"
import styled from "styled-components"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore"
import { handleKeyPress } from "../../../../utils/handleKeyPress"
import { useState } from "react"

export const ContainerDependentes = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`

export const ContainerOne = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 80%;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    text-align: center;
  }
`

export const ContainerTwo = styled.div`
  width: 15%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  padding-left: 6px;
  padding-right: 6px;

  /* @media (max-width: 900px) {
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    text-align: center;
  } */
`

export const ContainerThree = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 80%;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    text-align: center;
  }
`

export const TruncatedText = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  padding: 2px;
`

type Props = {
  limit: number;
}

export function ContainerDependentesComponent({ limit }: Props) {
  const [dependents, setDependetes] = useState(0);
  const [product, valorPorDependente, total, setHandleValorPorDependente, setValorTotal, handleTotalDependete] =
    FormRegisterClientStore((state) => [
      state.product,
      state.valorPorDependente,
      state.total,
      state.setHandleValorPorDependente,
      state.setValorTotal,
      state.handleTotalDependete
    ])

  function handleNumberDependents(value: any) {
    handleTotalDependete(value)
    setDependetes(value)
    realizarCalc(value)
  }

  const realizarCalc = (value: number) => {
    let valorPorDependente = 0;

    if (product.tipo === "PF" && product.add_secundarios === 1) {
      if (value >= 1) {
        valorPorDependente = 10;
        setHandleValorPorDependente(valorPorDependente);
        // @ts-ignore
        setValorTotal((value * parseFloat(valorPorDependente)) + parseFloat(product.preco))
        // setValorAdicional(parseFloat(parseFloat((value * valorPorDependente)) + parseFloat(product.preco)).toFixed(2));
      }
    }

    if (product.tipo === "PJ" && product.add_secundarios === 1) {
      if (value >= 1 && value <= 10) {
        valorPorDependente = 27.90;
        setHandleValorPorDependente(valorPorDependente);
        // @ts-ignore
        setValorTotal((value * parseFloat(valorPorDependente)) + parseFloat(product.preco))
      }
      if (value >= 11 && value <= 29) {
        valorPorDependente = 26;
        setHandleValorPorDependente(valorPorDependente);
        // @ts-ignore
        setValorTotal((value * parseFloat(valorPorDependente)) + parseFloat(product.preco))
      }

      if (value >= 30) {
        valorPorDependente = 23.72;
        setHandleValorPorDependente(valorPorDependente);
        // @ts-ignore
        setValorTotal((value * parseFloat(valorPorDependente)) + parseFloat(product.preco))
      }
    }
  }

  return (
    <ContainerDependentes>
      <ContainerOne>
        <TruncatedText fontSize={12}>
          Além dos dependentes contemplado pela assinatura escolhida, você pode
          adicionar extras em sua assinatura
        </TruncatedText>
      </ContainerOne>
      <ContainerTwo>
        {/* <IconButton
          disabled={product.add_secundarios !== 1 || dependents <= 0}
          onClick={handleRemoveDependente}
        >
          <RemoveIcon color="success" sx={{ fontSize: 18 }} />
        </IconButton> */}
        <TextField
          onKeyPress={handleKeyPress}
          type="text"
          disabled={product.add_secundarios !== 1}
          value={dependents}
          onChange={e => handleNumberDependents(Number(e.target.value))}
          sx={{ borderColor: "#A8B0B5", textAlign: 'center' }}
          size="small"
          variant="standard"
        />
        {/* <IconButton disabled={product.add_secundarios !== 1 || dependents >= limit} onClick={handleAddDepente}>
          <AddIcon color="success" sx={{ fontSize: 18 }} />
        </IconButton> */}
      </ContainerTwo>
      <ContainerThree>
        <TruncatedText fontSize={12}>
          Adicional por dependente {valorPorDependente.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })} / mës
        </TruncatedText>
        <TruncatedText fontSize={12}>Total {total.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })} / mës</TruncatedText>
      </ContainerThree>
    </ContainerDependentes>
  )
}
