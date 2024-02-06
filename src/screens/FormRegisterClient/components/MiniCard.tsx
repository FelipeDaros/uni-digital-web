import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const CardContainer = styled.div`
  border: 1px solid #EDF002;
  max-width: 250px;
  max-height: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 20px;
  padding: 10px;
`

type Props = {
  icon: OverridableComponent<any>,
  title: string;
}

export function MiniCardFeedBack({ icon: Icon, title }: Props) {
  return (
    <CardContainer>
      <Icon sx={{ fontSize: 24, color: '#28DA9D'}} />
      <Typography sx={{ fontSize: 12, marginLeft: 1 }} textAlign="center" color="GrayText">
        {title}
      </Typography>
    </CardContainer>
  )
}
