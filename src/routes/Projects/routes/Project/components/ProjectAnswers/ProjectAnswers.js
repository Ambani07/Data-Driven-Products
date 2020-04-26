/* eslint-disable no-console */
import React, { useState } from 'react'
import { useFirebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingSpinner from 'components/LoadingSpinner'

import uuid from 'react-uuid'
import { useNotifications } from 'modules/notification'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import ListItemText from '@material-ui/core/ListItemText'

import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import LinearProgress from '@material-ui/core/LinearProgress'
import Switch from '@material-ui/core/Switch'

import NewProjectAnswerDialog from '../NewProjectAnswerDialog'
import NewProjectAnswerTitle from '../NewProjectAnswerTitle'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '20px'
  },
  rightIcon: {
    marginLeft: theme.spacing(20)
  }
})

const useStyles = makeStyles(styles)

function useProjects() {
  const { showSuccess, showError } = useNotifications()
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

  // Get projects from redux state
  const projects = useSelector(state => state.firebase.ordered.projects)

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

  function addProject(data) {
    if (!auth.uid) {
      return showError('You must be logged in to create a project')
    }

    updateAnswers.push({ id: uuid(), ...data })

    return firebase
      .update(`projects/${projectId}`, { answers: updateAnswers })
      .then(() => {
        toggleDialog()
        showSuccess('Project added successfully')
      })
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not add project')
        return Promise.reject(err)
      })
  }

  const setQuiz = () => {
    if (localStorage.getItem('quiz') == null) {
      const defaultQuiz = {
        userId: auth.uid,
        productId: projectId
      }

      //set to localStorage
      localStorage.setItem('quiz', JSON.stringify(defaultQuiz))
    }
  }

  return { auth, projects, addProject, setQuiz, newDialogOpen, toggleDialog }
}
function ProjectAnswers() {
  const { projectId } = useParams()
  const classes = useStyles()
  const {
    auth,
    projects,
    addProject,
    setQuiz,
    newDialogOpen,
    toggleDialog
  } = useProjects()
  const completed = 50
  const buffer = 100
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
      <NewProjectAnswerDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <Switch onChange={setQuiz} />
      <List component="nav">
        <ListSubheader>
          Possible Answers
          <ListItemSecondaryAction>
            <NewProjectAnswerTitle onClick={toggleDialog} />
          </ListItemSecondaryAction>
        </ListSubheader>
        {project.answers !== null ? (
          project.answers.map(answer => (
            <ListItem key={answer.id}>
              <ListItemText primary={answer.text} />
              <ListItemSecondaryAction>
                <LinearProgress
                  variant="buffer"
                  value={completed}
                  valueBuffer={buffer}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <h1>No Answers</h1>
        )}
      </List>
    </div>
  )
}
export default ProjectAnswers
