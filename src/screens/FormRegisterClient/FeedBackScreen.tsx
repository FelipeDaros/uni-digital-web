import { Container, Grid, IconButton, Stack, Typography } from "@mui/material"
import { CustomButton } from "../../components/Button"
import { CardFeedBack } from "./components/Card"
import { MiniCardFeedBack } from "./components/MiniCard"

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp"
import HailSharpIcon from "@mui/icons-material/HailSharp"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import PermPhoneMsgSharpIcon from "@mui/icons-material/PermPhoneMsgSharp"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import { DivBackgroundColor, ImgLogo } from "./styles"

import imgLogo from "../../assets/logo-unidigital-horizontal-amarelo.png"

export function FeedBackScreen() {
  return (
    <>
      <DivBackgroundColor>
        <ImgLogo src={imgLogo} />
      </DivBackgroundColor>
      <Container maxWidth="md">
        <Grid container direction="column">
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              gutterBottom
              fontSize={22}
              sx={{ marginTop: 3, textAlign: "center", color: "GrayText" }}
            >
              Olá, <strong>Felipe</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} marginTop={1}>
            <Typography
              fontSize={14}
              sx={{ marginTop: 3, textAlign: "center", color: "GrayText" }}
            >
              Sua assinatura UniDigital foi concluída! 💚
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} marginTop={1}>
            <Typography
              fontSize={14}
              sx={{ marginTop: 3, textAlign: "center", color: "GrayText" }}
            >
              Estamos felizes por ter você aqui! Esperamos te oferecer a melhor
              experiência de saúde.
            </Typography>
          </Grid>
          <Stack
            sx={{ p: 4 }}
            direction="row"
            justifyContent="center"
            spacing={4}
          >
            <CustomButton size="large" variant="contained">
              <Typography fontSize={14} color="white">
                Acesse o Portal UniDigital
              </Typography>
            </CustomButton>
            <CustomButton size="large" variant="contained">
              <Typography fontSize={14} color="white">
                Acesse a Tabela de Valores
              </Typography>
            </CustomButton>
          </Stack>
          <Stack
            sx={{ p: 4 }}
            direction="row"
            justifyContent="center"
            spacing={4}
          >
            <CardFeedBack
              icon={MonitorHeartIcon}
              title="Clique aqui para agendar consultas de telemedicina"
            />
            <CardFeedBack
              icon={ApartmentSharpIcon}
              title="Conheça nossa red credenciada"
            />
            <CardFeedBack
              icon={HailSharpIcon}
              title="Clique aqui para agendar consultas com médicos especialistas"
            />
          </Stack>
          <Typography
            gutterBottom
            fontSize={16}
            sx={{ marginTop: 3, textAlign: "center", color: "GrayText" }}
          >
            Se tiver qualquer dúvida ou precisar de informações, fale com a
            gente:
          </Typography>
          <Stack
            sx={{ p: 4 }}
            direction="row"
            justifyContent="center"
            spacing={4}
          >
            <MiniCardFeedBack
              icon={PermPhoneMsgSharpIcon}
              title="(48) 3431-5965"
            />
            <MiniCardFeedBack icon={WhatsAppIcon} title="(48) 98451-9640" />
          </Stack>
          <Typography
            gutterBottom
            fontSize={16}
            sx={{ marginTop: 3, textAlign: "center", color: "GrayText" }}
          >
            Acompanhe as nossas redes sociais:
          </Typography>
          <Stack
            sx={{ p: 2 }}
            direction="row"
            justifyContent="center"
            spacing={1}
          >
            <IconButton>
              <InstagramIcon sx={{ fontSize: 38 }} color="success" />
            </IconButton>
            <IconButton>
              <FacebookIcon sx={{ fontSize: 38 }} color="success" />
            </IconButton>
          </Stack>
        </Grid>
      </Container>
      <IconButton
        color="primary"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 64 }} color="success" />
      </IconButton>
      <DivBackgroundColor></DivBackgroundColor>
    </>
  )
}
