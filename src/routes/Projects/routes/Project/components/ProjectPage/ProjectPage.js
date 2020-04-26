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
const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

const image = {
  url:
    'https://www.evergreens.co.za/428-atmn_large/yum-yum-smooth-peanut-butter-800g.jpg',
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
