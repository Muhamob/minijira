import { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { getAccessToken } from '../../utils/auth'
import { Avatar } from '@material-ui/core'
import { getUserProfile } from '../../api/user'
import { useQuery } from 'react-query'
import { useStyles } from './styles'
import { Link as RouterLink } from 'react-router-dom'

// const context = createContext()

const UserInfoPanelGroup = (props) => {
  const query = useQuery('userInfoPanelGroup', getUserProfile, {
    retry: (count, e) => {
      // TODO: add handling 401 Auth error
      console.log('count', count)
      console.log('error', e)
      return false
    }
  })

  console.log('user profile', query.data)
  if (query.isSuccess) {
    return <>
      <Typography variant="h6">
        {query.data.data.name}
      </Typography>
      <Avatar>{query.data.data.name.charAt(0)}</Avatar>
    </>
  } else {
    return <></>
  }
}

const NavigationMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return <>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      onClick={(e) => { setAnchorEl(e.currentTarget) }}
    >
      <MenuIcon />
    </IconButton>
    <Menu
      id="menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={(e) => { setAnchorEl(null) }}>
    <MenuItem component={RouterLink} to='/boards'>Boards</MenuItem>
    <MenuItem component={RouterLink} to='/register'>Sign Up</MenuItem>
    <MenuItem component={RouterLink} to='/auth'>Sign In</MenuItem>
    </Menu>
  </>
}

const ProfileMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return <>
  <IconButton
    aria-label="account of current user"
    aria-controls="menu-appbar"
    aria-haspopup="true"
    onClick={(e) => { setAnchorEl(e.currentTarget) }}
    color="inherit"
  >
    <UserInfoPanelGroup />
  </IconButton>
  <Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    open={open}
    onClose={(e) => { setAnchorEl(null) }}
  >
    <MenuItem>Profile</MenuItem>
    <MenuItem>My account</MenuItem>
  </Menu>
  </>
}

export const NavBar = (props) => {
  const auth = getAccessToken() != null
  const classes = useStyles()

  return <AppBar position="static">
  <Toolbar>
    <NavigationMenu />
    <Typography variant="h6">
      MiniJira
    </Typography>
    {auth && (
      <div className={classes.userProfile}>
        <ProfileMenu />
      </div>
    )}
  </Toolbar>
</AppBar>
}
