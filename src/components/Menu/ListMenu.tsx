import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="TELA INICIAL" sx={{color: '#fff'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="TELE CONSULTA" sx={{color: '#fff'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="ASSINATURA" sx={{color: '#fff'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="HIST. PAGAMENTOS" sx={{color: '#fff'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="REDE CREDENCIADA" sx={{color: '#fff'}}/>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon color='primary'/>
      </ListItemIcon>
      <ListItemText primary="CONSULTA ESPEC." sx={{color: '#fff'}}/>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);