// Navbar.tsx
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../css/Navbar.css' // Import the CSS file
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import logo from '../assets/logo.png'
import { getCurrentRouteName, getOtherNavbarRoutes, routes } from '../routes'
import { useTheme } from '@mui/material/styles'

const settings = ['Profile', 'Logout']

const Navbar: React.FC = () => {
  const pathname: string = getCurrentRouteName(window.location.pathname)
  const pages = getOtherNavbarRoutes(window.location.pathname)

  const theme = useTheme()
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box display={'flex'} p={2} gap={2}>
      <img src={logo} width={50} />

      <AppBar
        position='static'
        color='secondary'
        sx={{
          flexShrink: '5',
          borderRadius: '20px',
          border: 'solid 3px',
          borderColor: theme.palette.primary.main
        }}
      >
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '40px' }}>
          <Button fullWidth key={pathname} sx={{ fontSize: '18px', borderRadius: '15px' }}>
            {pathname}
          </Button>
        </Box>
      </AppBar>

      <AppBar position='static' sx={{ flexShrink: '1', borderRadius: '20px' }}>
        <Toolbar disableGutters sx={{ height: '100%', paddingRight: '20px' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, height: '100%', width: '100%' }}>
            {pages.map((page: any) => (
              <Button
                fullWidth
                key={'navbtn-' + page.name}
                onClick={() => navigate(page.path)}
                color='secondary'
                sx={{ fontSize: '18px', borderRadius: '15px' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
