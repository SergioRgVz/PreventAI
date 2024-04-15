import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
// import Userlogo from '/user.svg';


function Logo() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/home'); // Navigate to the home page
  }
  const handleNavigateNewReport = () => {
    navigate('/create-report'); 
  }
  return (
    <IconButton edge={'start'} size={'small'} color={'inherit'} onClick={handleNavigateHome} >
      <img src="\LOGOTFG.png" alt="PreventAI" style={{ height: '60px' }} />
    </IconButton>
  );
}

export function AppBarHome(props) {
  const navigate = useNavigate();
  const { pageToRouteMapping, settings } = props;
  const pages = Object.keys(pageToRouteMapping);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color='primary' position='sticky'>
      <Toolbar disableGutters>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start" >
          <Logo />
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => {
                const route = pageToRouteMapping[page];
                if (route)
                  navigate(route);
              }}>
                <Typography >{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
          {pages.map((page) => (
            <Grid item
            key={page}
              justifyContent="center"
              alignItems="stretch"
            >
              <Button
                key={page}
                onClick={() => {
                  const route = pageToRouteMapping[page];
                  if (route)
                    navigate(route);
                }}
                sx={{ my: 2, color: 'inherit'}}
              >
                {page}
              </Button>
            </Grid>
          ))}
          <Tooltip title="Abrir configuración">
            <IconButton onClick={handleOpenUserMenu} >
              <Avatar alt="usuario" src={'/user.svg'} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarHome;