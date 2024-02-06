import { Typography } from "@mui/material";
import styled from "styled-components";

type Props = {
  isSelected: boolean
}

export const ContainerCard = styled.a<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100px;
  min-height: 100px;
  width: 80%;
  border: ${props => props.isSelected ? '2px solid #28DA9D' : '2px solid #A8B0B5'};
  margin-top: 20px;
  
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  @media (max-width: 900px) {
    width: 80%;
    height: 400px;
    min-height: 400px;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    text-align: center;
  }
`;

export const TruncatedText = styled(Typography).attrs({ fontSize: 10 })`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 95%;
  padding: 2px;
`;

export const ContainerOne = styled.div`
  background-color: #F0FFF9;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const ContainerTwo = styled.div`
  width: 65%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  padding-left: 6px;
  padding-right: 6px;

  @media (max-width: 900px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const ContainerThree = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 100%;
  }
`

export const ImgLogoPlano = styled.img`
  width: 100px;
`