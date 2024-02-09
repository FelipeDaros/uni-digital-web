import { Grid, Stack } from "@mui/material";
import { MiniCardHome } from "../../components/MiniCardHome";

import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ShareIcon from '@mui/icons-material/Share';
import { VirtualCard } from "../../components/VirtualCard";
import { CardHomeOne } from "../../components/CardHomeOne";
import { CardHomeTwo } from "../../components/CardHomeTwo";

export function Home() {
  return (
    <Grid container>
      <Grid container>
        <VirtualCard />
      </Grid>
      <Grid container>
        <CardHomeOne nome="Felipe" />
      </Grid>
      <Grid container>
        <CardHomeTwo data="10/02/2023" valor={39.90} />
      </Grid>
      <Grid container>
        <MiniCardHome icon={AddToQueueIcon} title="Agendar Teleconsulta" />
        <MiniCardHome icon={GroupsIcon} title="Rede Credenciada" />
      </Grid>
      <Grid container>
        <MiniCardHome icon={BadgeIcon} title="Consulta com Especialistas" />
        <MiniCardHome icon={ShowChartIcon} title="Minhas Finanças" />
      </Grid>
        <MiniCardHome icon={SupportAgentIcon} title="Suporte" />
        <MiniCardHome icon={ShareIcon} title="Redes Sociais" />
      <Grid container></Grid>
    </Grid>
  )
}