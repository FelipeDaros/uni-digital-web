import { Typography } from "@mui/material"
import styled from "styled-components"
import { OverridableComponent } from "@mui/material/OverridableComponent"

const CardContainer = styled.a`
  border: 1px solid #edf002;
  max-width: 230px;
  max-height: 230px;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  padding: 1px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

type Props = {
  icon: OverridableComponent<any>
  title: string
}

export function CardFeedBack({ icon: Icon, title }: Props) {
  return (
    <CardContainer>
      <Icon sx={{ fontSize: 74, color: "#28DA9D" }} />
      <Typography
        textAlign="center"
        color="GrayText"
        sx={{ fontSize: 12, marginLeft: 1 }}
      >
        {title}
      </Typography>
    </CardContainer>
  )
}
