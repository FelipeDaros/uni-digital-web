import React from "react";
import { CardContainer } from "./styles";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  icon: React.ReactNode;
  route: string;
}

export function CardComponent({ icon, route, title }: Props){
  const navigate = useNavigate();

  function handleNavigateRoute(route: string){
    navigate(route);
  }

  return(
    <CardContainer onClick={() => handleNavigateRoute(route)}>
        {icon}
        <Typography color='white' sx={{margin: '10px'}} fontSize={12}>{title}</Typography>
    </CardContainer>
  )
}