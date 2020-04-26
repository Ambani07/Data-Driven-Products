import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import Grid from '@material-ui/core/Grid'
import { useLocation } from 'react-router-dom'
import theme from './CoreLayout.styles'

const useStyles = makeStyles(theme)

export default function CoreLayout({ children }) {
  const classes = useStyles()
  const auth = useSelector(state => state.firebase.auth)
  const location = useLocation()
  return (
    <div className={classes.root}>
      {auth.uid && location.pathname != '/quiz' ? <Navbar /> : null}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid item xs={12}>
          {children}
        </Grid>
      </main>
    </div>
  )
}
