import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import toRenderProps from 'recompose/toRenderProps'
import withState from 'recompose/withState'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useFirebase } from 'react-redux-firebase'

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null))

function NavbarMenu() {
  const firebase = useFirebase()
  const onLogoutClick = e => {
    e.preventDefault()
    firebase.logout()
  }
  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl)
        const handleClose = () => {
          updateAnchorEl(null)
        }

        return (
          <div>
            <Button
              aria-owns={open ? 'render-props-menu' : undefined}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget)
              }}>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </Button>
            <Menu
              id="render-props-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        )
      }}
    </WithState>
  )
}

export default NavbarMenu
