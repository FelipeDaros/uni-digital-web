import { Grid } from "@mui/material"
import { MiniCardHome } from "../../components/MiniCardHome"

import AddToQueueIcon from "@mui/icons-material/AddToQueue"
import GroupsIcon from "@mui/icons-material/Groups"
import BadgeIcon from "@mui/icons-material/Badge"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import ShareIcon from "@mui/icons-material/Share"

import { VirtualCard } from "../../components/VirtualCard"
import { CardHomeOne } from "../../components/CardHomeOne"
import { CardHomeTwo } from "../../components/CardHomeTwo"
import { useAuth } from "../../context/AuthContext"

export function Home() {
  const { user } = useAuth();
  console.log(user)
  return (
    <Grid container>
      {user?.user.tipo !== 'A' &&
        <>
          <Grid container>
            {/* @ts-ignore */}
            <VirtualCard nome={user?.user?.nome} codigo={user?.user.documento} data_nascimento={user?.user.data_nascimento} nome_produto={user.produto.nome} />
            <CardHomeOne nome="Felipe" />
            <CardHomeTwo data={user?.assinatura?.data_vencimento} valor={Number(user?.assinatura?.total)} />
          </Grid>
          <Grid container>
            <MiniCardHome icon={AddToQueueIcon} title="Agendar Teleconsulta" />
            <MiniCardHome icon={GroupsIcon} title="Rede Credenciada" />
            <MiniCardHome icon={BadgeIcon} title="Consulta com Especialistas" />
            <MiniCardHome icon={ShowChartIcon} title="Minhas Finanças" />
            <MiniCardHome icon={SupportAgentIcon} title="Suporte" />
            <MiniCardHome icon={ShareIcon} title="Redes Sociais" />
          </Grid>
        </>
      }
    </Grid>
  )
}
