/* eslint-disable no-console */
import React, { useState } from 'react'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})
function Uploader(props) {
  const { classes } = props
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const firebase = useFirebase()
  const pathReference = firebase
    .storage()
    .ref('images/75b413b7f03a08dbb8bf2a772b7cb5b5.png')
    .getDownloadURL()
    .then(url => {
      // console.log(url)
    })
  // url = pathReference = storage.ref('images/stars.jpg')

  // console.log(pathReference)

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
  const handleUpdate = e => {
    // e.preventDefault()
    // console.log(image)
    if (image) {
      const uploadTask = firebase
        .storage()
        .ref(`/images/${image.name}`)
        .put(image)
      // storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.byteTransferred / snapshot.totalBytes) * 100
          )
          setProgress(progress)
        },
        error => {
          setError(error)
        },
        () => {
          firebase
            .storage()
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url)
              setUrl(url)
              setProgress(0)
            })
        }
      )
    } else {
      setError('Error please choose an image to upload.')
    }
  }
  return (
    <div>
      <input type="file" onChange={hangleChange} />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
          className={classes.button}
          onClick={handleUpdate}>
          Upload
        </Button>
      </label>
      <div style={{ height: '100px' }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ''}
        <p style={{ color: 'red' }}>{error}</p>
      </div>
      {url ? (
        <img src={url} alt="logo" />
      ) : (
        <img src={url} className="App-logo" alt="logo" />
      )}
    </div>
  )
}

Uploader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Uploader)
