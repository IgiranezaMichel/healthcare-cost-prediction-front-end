import * as React from 'react';
import { Sidebar } from './sideBar';
import Header from './header';
import { Link, useLocation } from 'react-router-dom';
import { Box, Breadcrumbs, CssBaseline} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IMenu } from '../interface/menu';
interface IMenuItem {
  navItems: IMenu[],
  children: React.ReactNode
}
export const Navigation: React.FC<IMenuItem> = (prop) => {
  const location = useLocation();
  const menuBreadCumb = location.pathname.split('/');
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh'}}>
        <Header />
        <Sidebar menu={prop.navItems} />
        <Box
          component="main"
          className="MainContent overflow-auto"
          sx={{
            px: { xs: 2, md:1 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs

              aria-label="breadcrumbs"
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ pl: 0 }}
            >
              {menuBreadCumb.map((data, index: number) => <Link key={index}
                color="neutral" className='nav-link'
                to={index == 1 ? '/' + data : data}
              >
                {data}
              </Link>)}
            </Breadcrumbs>
          </Box>
          
          <Box sx={{px: { xs: 2, md:1 }}}>
          {prop.children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
