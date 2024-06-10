import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import * as React from 'react';
import { closeSidebar } from './navigationUtil';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Dialog, Divider, GlobalStyles, IconButton,List, ListItem, ListItemButton, Paper, Typography, listItemButtonClasses } from '@mui/material';
import { Color } from '../util/constant/color';
import { IMenu } from '../interface/menu';
import { blue } from '@mui/material/colors';
import { useAuthenticationContext } from '../auth';
import { LogoutComponent } from './logout';
import { Close } from '@mui/icons-material';
interface Menu {
  menu: IMenu[]
}
export const Sidebar: React.FC<Menu> = (prop) => {
  const location=useLocation();
  const navigation=useNavigate();
  const {data}=useAuthenticationContext();
  const [openLogout,setOpenLogout]=React.useState(false);
  return (
    <Paper
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        bgcolor:Color.blue,
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton  color="inherit" className='small'>
          <span className='rounded-circle bg-info small pe-2 fw-bold ps-2'>H</span>
          <span className='rounded-circle bg-primary text-white fw-bold small pe-2 ps-2'>C</span>
          <span className='rounded-circle bg-success text-white fw-bold small pe-2 ps-2'>C</span>
          <span className='rounded-circle bg-white small pe-2 fw-bold ps-2'>P</span>        </IconButton>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px'
          }}
        >
          {
            prop.menu.map(data => {
              return <ListItem key={data.link}>
                <ListItemButton className={location.pathname==data.link?'border-0 border-start border-3 bg-primary-subtle border-info':''} onClick={()=>navigation(data.link)} selected={location.pathname==data.link?true:false}>
                   <div className={location.pathname==data.link?'':'text-white'}>{data.icon}</div>
                    <Typography className={location.pathname==data.link?'':'text-white fw-bold'} sx={{fontSize:''}}>{data.name}</Typography>
                 </ListItemButton>
              </ListItem>
            })
          }
        </List>
        <List
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton className='text-white' onClick={()=>navigation("/setting")}>
              <SettingsRoundedIcon className='text-white'/>
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box  sx={{ display: 'flex', flex: 1, gap: 1, alignItems: 'center',bgcolor:blue[900],height:'100dvh' }}>
        <Avatar src={data.profile} sx={{width:30,height:30}}/>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography className='small text-white' overflow={'hidden'}>{data.name}</Typography>
          <Typography  className='small text-white small' overflow={'hidden'}>{data.email}</Typography>
        </Box>
        <IconButton onClick={()=>setOpenLogout(true)}>
          <LogoutRoundedIcon className='text-white'/>
        </IconButton>
      </Box>
      <Dialog maxWidth='xs'  open={openLogout} className="rounded-0 p-2">
       <LogoutComponent>
       <IconButton className='float-end' onClick={()=>setOpenLogout(false)}><Close/></IconButton>
       </LogoutComponent>
    </Dialog>
    </Paper>
  );
}
