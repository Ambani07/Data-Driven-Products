import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { makeStyles } from '@material-ui/core/styles'
import { Field } from 'redux-form'
import TextField from 'components/FormTextField'
import { required } from 'utils/form'
import styles from './DeleteProjectDialog.styles'
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles(styles)

function DeleteProjectDialog({ handleSubmit, open, onRequestClose }) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-project-dialog-title">
        Delete this project?
      </DialogTitle>
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <DialogActions>
          <Button onClick={onRequestClose} color="secondary">
            No
          </Button>
          <Button type="submit" color="primary">
            Yes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

DeleteProjectDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default DeleteProjectDialog
