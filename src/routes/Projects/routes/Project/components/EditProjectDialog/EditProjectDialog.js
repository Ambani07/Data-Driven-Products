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
import styles from './EditProjectDialog.styles'
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles(styles)

function EditProjectDialog({ handleSubmit, open, onRequestClose, project }) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-project-dialog-title">
        New Project Answer
      </DialogTitle>
      <form onSubmit={handleSubmit} className={classes.inputs}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="name"
                component={TextField}
                label="Project Name"
                validate={[required]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="question"
                component={TextField}
                label="Question"
                validate={[required]}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

EditProjectDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default EditProjectDialog
