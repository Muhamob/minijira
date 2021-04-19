import React from 'react'
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

const UserInfoPanelGroup = (props) => {
  const query = useQuery('userInfoPanelGroup', getUserProfile)

  if (query.isLoading) {
    return <Avatar>Loading</Avatar>
  }
  if (query.isError) {
    return <Avatar>Error</Avatar>
  }
  console.log('user profile', query.data)
  return <Avatar>{query.data.data.name}</Avatar>
}

export const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const auth = getAccessToken() != null
  const open = Boolean(anchorEl)

  return <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6">
      MiniJira
    </Typography>
    {auth && (
      <div>
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
      </div>
    )}
  </Toolbar>
</AppBar>
}
