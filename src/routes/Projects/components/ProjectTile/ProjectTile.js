import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import { useFirebase } from 'react-redux-firebase'
import { LIST_PATH } from 'constants/paths'
import styles from './ProjectTile.styles'
import useNotifications from 'modules/notification/components/useNotifications'

const useStyles = makeStyles(styles)

function ProjectTile({ name, image, projectId, showDelete }) {
  const classes = useStyles()
  const history = useHistory()
  const firebase = useFirebase()
  const [url, setUrl] = useState('')
  const { showError, showSuccess } = useNotifications()

  firebase
    .storage()
    .ref(`images/${image}`)
    .getDownloadURL()
    .then(url => {
      // console.log(url)
      setUrl(url)
    })

  function goToProject() {
    return history.push(`${LIST_PATH}/${projectId}`)
  }

  function deleteProject() {
    return firebase
      .remove(`projects/${projectId}`)
      .then(() => showSuccess('Project deleted successfully'))
      .catch(err => {
        console.error('Error:', err) // eslint-disable-line no-console
        showError(err.message || 'Could not delete project')
        return Promise.reject(err)
      })
  }

  return (
    <Paper
      className={classes.root}
      style={{
        backgroundImage: 'url(' + url + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <div className={classes.top}>
        <span className={classes.name} onClick={goToProject}>
          {name || 'No Name'}
        </span>
        {showDelete ? (
          <Tooltip title="delete">
            <IconButton onClick={deleteProject}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Paper>
  )
}

ProjectTile.propTypes = {
  name: PropTypes.string
}

ProjectTile.defaultProps = {
  showDelete: true
}

export default ProjectTile
