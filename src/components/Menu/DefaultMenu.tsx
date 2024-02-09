import { Avatar, Divider, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';

import logo from '../../assets/logo-unidigital-horizontal-amarelo.png'


import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from '@mui/icons-material/Menu';

import { useDrawerContext } from '../../context/DrawerContext';
import { ExitToApp } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';


//@ts-ignore
export const DefaultMenu: React.FC = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const { signOut } = useAuth();

  console.log(isDrawerOpen)


  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#28DA9D',
          marginLeft: smDown || !isDrawerOpen ? 0 : theme.spacing(28)
        }}
      >
        <IconButton sx={{marginRight: 1}} onClick={toggleDrawerOpen}>
          <MenuIcon color='primary'/>
        </IconButton>
        <img src={logo} style={{ width: 100 }} />
        <Typography
          color="white"
          noWrap
          sx={{ flexGrow: 1, marginLeft: 1, fontSize: 12 }}
        >
          FELIPE DAROS
        </Typography>
        <IconButton color="inherit" onClick={() => signOut()}>
          <ExitToApp color='primary' />
        </IconButton>
      </Toolbar>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'persistent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" bgcolor="#28DA9D">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://yt3.ggpht.com/grfYgQadT8iNg9WPb-jkrKB-9224y_DBDXAOtV4Yt7cyQmtR47J_453uveQOTDsp_dRSH851TMM=s108-c-k-c0x00ffffff-no-rj"
            />
          </Box>

          <Divider />

          <Box flex={1} sx={{ backgroundColor: '#28DA9D' }}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Página inicial" />
              </ListItemButton>
            </List>
          </Box>

        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown || !isDrawerOpen ? 1 : theme.spacing(29)}>
        {children}
      </Box>
      <IconButton
        color="primary"
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 30 }} color='success' />
      </IconButton>
    </>
  );
};