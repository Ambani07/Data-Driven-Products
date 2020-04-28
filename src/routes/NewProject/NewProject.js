/* eslint-disable no-console */
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useNotifications } from 'modules/notification'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.flexColumnCenter,
    paddingTop: theme.spacing(4),
    flexGrow: '2'
  },
  tiles: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '-webkit-flex-flow': 'row wrap'
  }
}))

function useProjects() {
  const { showSuccess, showError } = useNotifications()
  const firebase = useFirebase()
  let history = useHistory()
  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)

  function addProject(newInstance) {
    if (!auth.uid) {
      return showError('You must be logged in to create a project')
    }

    const uploadTask = firebase
      .storage()
      .ref(`/images/${newInstance.image.name}`)
      .put(newInstance.image)

    // console.log(uploadTask)
    if (uploadTask) {
      return firebase
        .push('projects', {
          id: uuid(),
          name: newInstance.name,
          image: newInstance.image.name,
          question: newInstance.question,
          answers: [0],
          createdBy: auth.uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
          history.push('/products')
          showSuccess('Project added successfully')
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          showError(err.message || 'Could not add project')
          return Promise.reject(err)
        })
    }
  }

  return { addProject }
}

function NewProject() {
  const { addProject } = useProjects()

  const classes = useStyles()
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [question, setQuestion] = useState('')
  const [error, setError] = useState('')
  const handleName = event => {
    setName(event.target.value)
  }

  const handleQuestion = event => {
    setQuestion(event.target.value)
  }

  const hangleChange = e => {
    const file = e.target.files[0]
    if (file) {
      const fileType = file['type']
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
      if (validImageTypes.includes(fileType)) {
        setError('')
        setImage(file)
      } else {
        setError('Please select an image to upload')
      }
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    // console.log({ name, question, image })
    addProject({ name, question, image })
  }
  return (
    <div className={classes.root}>
      <h1>New Project</h1>
      <Grid container direction="row" justify="center" alignItems="baseline">
        <Grid item xs={6}>
          <form
            onSubmit={handleSubmit}
            className={classes.inputs}
            autoComplete="off">
            <TextField
              fullWidth
              id="standard-basic"
              label="New Project Name"
              onChange={handleName}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Question"
              onChange={handleQuestion}
            />
            <input type="file" onChange={hangleChange} />
            <p style={{ color: 'red' }}>{error}</p>
            <Button
              fullWidth
              style={{ marginTop: '2%' }}
              type="submit"
              color="primary"
              variant="contained">
              Create
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default NewProject
