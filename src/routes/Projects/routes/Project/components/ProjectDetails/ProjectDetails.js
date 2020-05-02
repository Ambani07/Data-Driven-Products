/* eslint-disable no-console */
import React, { useState } from 'react'
import { useFirebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'
import theme from './ProjectDetails.styles'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import ProjectAnswers from '../ProjectAnswers'
import EditProjectDialog from '../EditProjectDialog'
const styles = theme

const useStyles = makeStyles(styles)
function useProjects() {
  const firebase = useFirebase()
  const { projectId } = useParams()
  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)

  const updateAnswers = []

  // Attach todos listener
  useFirebaseConnect(() => [
    {
      path: 'projects',
      queryParams: ['limitToLast=10']
      // queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`]
    }
  ])
  // Get project answers from redux state
  const answers = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectId].answers
  })

  answers.forEach(answer => {
    updateAnswers.push(answer)
  })

  // New dialog
  const [newDialogOpen, changeDialogState] = useState(false)
  const toggleDialog = () => changeDialogState(!newDialogOpen)

  function updatProject(data) {
    // console.log(data)

    return firebase
      .update(`projects/${projectId}`, {
        name: data.name,
        question: data.question
      })
      .then(() => {
        toggleDialog()
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        return Promise.reject(err)
      })
  }

  return { updatProject, newDialogOpen, toggleDialog, auth }
}
function ProjectDetails({ project }) {
  const classes = useStyles()
  const { projectId } = useParams()
  const {
    updatProject,
    newDialogOpen,
    toggleDialog,
    auth,
    switchinitStatus
  } = useProjects()
  const quiz = JSON.parse(localStorage.getItem('quiz'))
  const [swithStatus, setSwitchStatus] = useState(switchinitStatus)

  const setQuiz = () => {
    const defaultQuiz = {
      userId: auth.uid,
      productId: projectId
    }

    if (quiz.productId !== projectId) {
      setSwitchStatus(true)
    }

    //set to localStorage
    localStorage.setItem('quiz', JSON.stringify(defaultQuiz))
    setSwitchStatus(true)
  }
  // Create listener for projects
  useFirebaseConnect(() => [{ path: `projects/${projectId}` }])

  return (
    <div className={classes.root}>
      <EditProjectDialog
        onSubmit={updatProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
        project={project}
      />
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <h3>Project Details</h3>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <EditIcon onClick={toggleDialog} />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={`Name`} secondary={project.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Question`} secondary={project.question} />
          </ListItem>
        </List>
        <ExpansionPanel className={classes.possibleAnswers}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header">
            <div className={classes.column}>
              <Typography className={classes.heading}>
                Project Answers
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            {project.answers.map(answer => (
              <Chip label={answer.text} onDelete={() => {}} />
            ))}
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <ProjectAnswers />
          </ExpansionPanelActions>
        </ExpansionPanel>
      </Grid>
    </div>
  )
}

export default ProjectDetails
