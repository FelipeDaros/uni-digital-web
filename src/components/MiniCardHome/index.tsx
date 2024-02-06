import { Icon, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import styled from "styled-components"

const ContainerCard = styled.div`
  width: 150px;
  max-width: 150px;
  height: 150px;
  max-height: 150px;
  background-color: #28DA9D;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 2px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

type Props = {
  icon: OverridableComponent<any>,
  title: string;
}

export function MiniCardHome({ icon: Icon, title }: Props) {
  return (
    <ContainerCard>
      <Icon sx={{ fontSize: 42, color: '#fff' }} />
      <Typography sx={{ fontSize: 14, marginTop: 2 }} textAlign="center" color="white">
        {title}
      </Typography>
    </ContainerCard>
  )
}