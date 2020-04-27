import React from 'react'
import PropTypes from 'prop-types'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import styles from './NewProjectAnswerTitle.styles'

const useStyles = makeStyles(styles)

function NewProjectAnswerTitle({ onClick }) {
  const classes = useStyles()

  return (
    <div className={classes.root} onClick={onClick}>
      <AddIcon />
    </div>
  )
}

NewProjectAnswerTitle.propTypes = {
  onClick: PropTypes.func
}

export default NewProjectAnswerTitle
