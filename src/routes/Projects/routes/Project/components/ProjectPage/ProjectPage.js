import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'
import styles from './ProjectPage.styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import ProductAnswers from '../ProjectAnswers'

import Container from '@material-ui/core/Container'

const useStyles = makeStyles(styles)

function ProjectPage() {
  const { projectId } = useParams()
  const classes = useStyles()

  // Create listener for projects
  useFirebaseConnect(() => [{ path: `projects/${projectId}` }])

  // Get projects from redux state
  const project = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectId]
  })

  // Show loading spinner while project is loading
  if (!isLoaded(project)) {
    return <LoadingSpinner />
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid
          container
          spacing={3}
          style={{
            backgroundImage: 'url(' + project.image + ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '25vh'
          }}></Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProductAnswers />
          </Grid>
          <Grid item xs={12}>
            <h1>View Starts</h1>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ProjectPage
