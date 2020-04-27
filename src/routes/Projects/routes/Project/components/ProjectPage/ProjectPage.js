import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import ProductAnswers from '../ProjectAnswers'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'
import theme from './ProjectPage.styles'
const styles = theme

const image = {
  title: 'Start Quiz',
  width: '100%'
}

function ProjectPage(props) {
  const { classes } = props
  const { projectId } = useParams()

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
            backgroundImage: `url(${project.image})`
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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProductAnswers />
        </Grid>
        <Grid item xs={12}>
          <h1>View Starts</h1>
        </Grid>
      </Grid>
    </div>
  )
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProjectPage)
