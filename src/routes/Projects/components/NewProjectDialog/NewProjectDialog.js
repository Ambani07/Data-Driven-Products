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
import styles from './NewProjectDialog.styles'
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles(styles)

function NewProjectDialog({ handleSubmit, open, onRequestClose }) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-project-dialog-title">New Project</DialogTitle>
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
                name="image"
                component={TextField}
                label="Project Image"
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
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

NewProjectDialog.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // from enhancer (reduxForm)
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default NewProjectDialog
