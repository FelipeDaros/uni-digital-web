import { IconButton, TextField, Typography } from "@mui/material"
import styled from "styled-components"

import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { FormRegisterClientStore } from "../../store/FormRegisterClientStore"
import { handleKeyPress } from "../../../../utils/handleKeyPress"

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

  @media (max-width: 900px) {
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    text-align: center;
  }
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

export function ContainerDependentesComponent() {
  const [handleAddDependents, handleRemoveDependents, totalDependets, handleNumberDependents] =
    FormRegisterClientStore((state) => [
      state.handleAddDependents,
      state.handleRemoveDependents,
      state.totalDependets,
      state.handleNumberDependents
    ])

  return (
    <ContainerDependentes>
      <ContainerOne>
        <TruncatedText fontSize={12}>
          Além dos dependentes contemplado pela assinatura escolhida, você pode
          adicionar extras em sua assinatura
        </TruncatedText>
      </ContainerOne>
      <ContainerTwo>
        <IconButton
          onClick={() => handleRemoveDependents()}
        >
          <RemoveIcon color="success" sx={{ fontSize: 18 }} />
        </IconButton>
        <TextField
          onKeyPress={handleKeyPress}
          type="text"
          value={totalDependets}
          onChange={e => handleNumberDependents(Number(e.target.value))}
          sx={{ borderColor: "#A8B0B5", textAlign: 'center' }}
          size="small"
          variant="standard"
        />
        <IconButton onClick={() => handleAddDependents()}>
          <AddIcon color="success" sx={{ fontSize: 18 }} />
        </IconButton>
      </ContainerTwo>
      <ContainerThree>
        <TruncatedText fontSize={12}>
          Adicional por dependente R$ 0,00 / mës
        </TruncatedText>
        <TruncatedText fontSize={12}>Total R$ 0,00 / mës</TruncatedText>
      </ContainerThree>
    </ContainerDependentes>
  )
}
