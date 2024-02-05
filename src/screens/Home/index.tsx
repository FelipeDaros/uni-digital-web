import { Grid } from "@mui/material";
import { CardComponent } from "../../components/Card";
import TvIcon from '@mui/icons-material/Tv';



export function Home() {
  return (
    <Grid item container>
      <CardComponent route="/tele" title="Agenda Teleconsulta" icon={<TvIcon color='primary' />} />
      <CardComponent route="/tele" title="Agenda Teleconsulta" icon={<TvIcon color='primary' />} />
      <CardComponent route="/tele" title="Agenda Teleconsulta" icon={<TvIcon color='primary' />} />
    </Grid>
  )
}