/* eslint-disable no-console */
import React, { useState, useCallback } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { connect } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
function Quiz({ answer, addQuiz }) {
  const [clicked, clickedButton] = useState(false)
  const onClick = useCallback(
    answer => {
      addQuiz(answer)
      clickedButton(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickedButton]
  )
  return (
    <Chip
      label={answer.text}
      clickable
      color="primary"
      onDelete={onClick.bind(this, answer)}
      deleteIcon={clicked ? <CheckCircleIcon /> : <CancelIcon />}
    />
  )
}
function mapStateToProps(state) {
  return {
    quiz: state.quiz
  }
}

const addQuiz = answer => ({
  type: 'ADD_QUIZ',
  payload: answer
})

const mapDispatchToProps = dispatch => {
  return {
    addQuiz: answer => dispatch(addQuiz(answer))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)
