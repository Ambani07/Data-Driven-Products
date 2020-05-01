/* eslint-disable no-console */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import ProjectStats from '../ProjectStats'
import ProjectDetails from '../ProjectDetails'
import Grid from '@material-ui/core/Grid'
import { useParams, Link } from 'react-router-dom'
import { useFirebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'
import theme from './ProjectPage.styles'
// import Uploader from './Uploader'

const styles = theme

const image = {
  title: 'Show Active Quiz',
  width: '100%'
}

function ProjectPage(props) {
  const { classes } = props
  const { projectId } = useParams()
  const firebase = useFirebase()
  const [url, setUrl] = useState('')
  // Create listener for projects
  useFirebaseConnect(() => [{ path: `projects/${projectId}` }])

  // Get projects from redux state
  const project = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectId]
  })

  // console.log(project.image)

  firebase
    .storage()
    .ref(`images/${project.image}`)
    .getDownloadURL()
    .then(url => {
      // console.log(url)
      setUrl(url)
    })

  // Show loading spinner while project is loading
  if (!isLoaded(project)) {
    return <LoadingSpinner />
  }

  return (
    <div className={classes.root}>
      <Link to="/quiz">
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width
          }}>
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${url})`
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}>
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      </Link>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProjectDetails project={project} />
        </Grid>
        <Grid item xs={12}>
          <ProjectStats project={project} />
        </Grid>
      </Grid>
    </div>
  )
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectPage)
