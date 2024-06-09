import MenuIcon from '@mui/icons-material/Menu';
import { toggleSidebar } from './navigationUtil';
import {  GlobalStyles, IconButton, Paper } from '@mui/material';
export default function Header() {
  return (
    <Paper
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        borderRadius:'0px',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton 
        onClick={() => toggleSidebar()}
      >
        <MenuIcon />
      </IconButton>
       <span className='fw-bold'><span className='text-primary'>MOH</span> Health</span>
    </Paper>
  );
}
