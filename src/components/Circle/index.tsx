import styled from "styled-components";

type PropsColor = {
  colorCircle: 1 | 0;
}

const CircleStyled = styled.div<PropsColor>`
  width: 20px; /* Adicionando 'px' após o valor de largura */
  height: 20px; /* Adicionando 'px' após o valor de altura */
  border-radius: 50px;
  background-color: ${props => props.colorCircle === 1 ? '#27da9d' : '#e8e8e8'};
`;

export function Circle({ colorCircle }:PropsColor){
  return(
    <CircleStyled colorCircle={colorCircle}/>
  )
}