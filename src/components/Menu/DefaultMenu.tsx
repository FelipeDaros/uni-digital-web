import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import logo from '../../assets/logo-unidigital-horizontal-amarelo.png'
import { useAuth } from '../../context/AuthContext';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToApp from '@mui/icons-material/ExitToApp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from 'react-router-dom';


const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  border: 'none',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boder: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(8),
        [theme.breakpoints.down('sm')]: {
          width: 0,
          display: 'none',
        },
      }),
    },
  }),
);

//@ts-ignore
export const DefaultMenu: React.FC = ({ children }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px',
            backgroundColor: '#28DA9D',
          }}
        >
          <IconButton
            edge="start"
            color='primary'
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon color='primary' />
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
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: '#28DA9D',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav" sx={{ backgroundColor: '#28DA9D', height: '100%', border: 'none', overflow: 'hidden' }}>
          <React.Fragment>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <DashboardIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="TELA INICIAL" sx={{ color: '#fff' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="TELE CONSULTA" sx={{ color: '#fff' }} />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/signature')}>
              <ListItemIcon>
                <PeopleIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="ASSINATURA" sx={{ color: '#fff' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="HIST. PAGAMENTOS" sx={{ color: '#fff' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="REDE CREDENCIADA" sx={{ color: '#fff' }} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon color='primary' />
              </ListItemIcon>
              <ListItemText primary="CONSULTA ESPEC." sx={{ color: '#fff' }} />
            </ListItemButton>
          </React.Fragment>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: '#ffffff',
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
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
      </Box>
    </Box>
  );
};
