import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"

import logo from "../../assets/logo-unidigital-horizontal-amarelo.png"

import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import MenuIcon from "@mui/icons-material/Menu"

import { useDrawerContext } from "../../context/DrawerContext"
import { ExitToApp } from "@mui/icons-material"
import { useAuth } from "../../context/AuthContext"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface IListItemLinkProps {
  to: string
  icon: OverridableComponent<any>
  label: string
  onClick: (() => void) | undefined
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon: Icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate()

  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  const handleClick = () => {
    navigate(to)
    onClick?.()
  }

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon sx={{ fontSize: 32, color: "#fff" }} />
      </ListItemIcon>
      <ListItemText primary={label} sx={{ color: "#fff" }} />
    </ListItemButton>
  )
}

//@ts-ignore
export const DefaultMenu: React.FC = ({ children }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext()
  const { signOut, user } = useAuth()

  const handleOpenWhatsApp = () => window.open("https://wa.link/mfcbc6", "_blank");

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#28DA9D",
          marginLeft: smDown || !isDrawerOpen ? 0 : theme.spacing(28),
        }}
      >
        <IconButton sx={{ marginRight: 1 }} onClick={toggleDrawerOpen}>
          <MenuIcon color="primary" />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <img src={logo} style={{ width: 100 }} />
        </Box>
        <IconButton color="inherit" onClick={() => signOut()}>
          <ExitToApp color="primary" />
        </IconButton>
      </Toolbar>

      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "persistent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
          bgcolor="#28DA9D"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src={user.user.foto ?? "https://yt3.ggpht.com/grfYgQadT8iNg9WPb-jkrKB-9224y_DBDXAOtV4Yt7cyQmtR47J_453uveQOTDsp_dRSH851TMM=s108-c-k-c0x00ffffff-no-rj"}
            />
          </Box>
          <Typography
            color="white"
            noWrap
            textAlign="center"
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
            component="a"
            onClick={() => navigate("/profile")}
          >
            {user.user.nome.toUpperCase()}
          </Typography>
          <Divider />

          <Box flex={1} sx={{ backgroundColor: "#28DA9D" }}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <>
                  {!drawerOption.disabled &&
                    <ListItemLink
                      to={drawerOption.path}
                      key={drawerOption.id}
                      icon={drawerOption.icon}
                      label={drawerOption.label}
                      onClick={smDown ? toggleDrawerOpen : undefined}
                    />}
                </>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box
        height="100vh"
        marginLeft={smDown || !isDrawerOpen ? 2 : theme.spacing(29)}
        marginRight={2}
      >
        {children}
      </Box>
      <IconButton
        onClick={handleOpenWhatsApp}
        color="primary"
        sx={{
          position: "fixed",
          bottom: "4px",
          right: "4px",
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 40 }} color="success" />
      </IconButton>
    </>
  )
}
