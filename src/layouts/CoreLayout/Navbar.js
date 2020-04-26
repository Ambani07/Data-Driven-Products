import React from 'react'
import clsx from 'clsx'
import { useFirebase } from 'react-redux-firebase'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import theme from './CoreLayout.styles'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import NavbarMenu from './NavbarMenu'
import { useLocation } from 'react-router-dom'
import {
  mainListItems,
  secondaryListItems
} from '../../routes/Home/components/HomePage/listItems'

const useStyles = makeStyles(theme)

export default function Navbar() {
  const classes = useStyles()
  const firebase = useFirebase()
  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  let location = useLocation()
  // console.log(location.pathname)
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const onLogoutClick = e => {
    e.preventDefault()
    firebase.logout()
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Dashboard
          </Typography>
          {auth ? <Link className="nav-link">{auth.email}</Link> : null}

          {auth && <NavbarMenu />}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
    </div>
  )
}