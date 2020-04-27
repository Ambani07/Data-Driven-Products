/* eslint-disable no-console */
import React, { useState, useCallback } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'

function Quiz({ answer, classes, addQuiz }) {
  const [clicked, clickedButton] = useState(false)
  const onClick = useCallback(
    answer => {
      addQuiz(answer)
      clickedButton(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickedButton]
  ) // Array of dependencies for which the memoization should update
  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      onClick={onClick.bind(this, answer)}>
      {answer.text}
      {'   '}
      {clicked ? (
        <CheckIcon className={classes.rightIcon} />
      ) : (
        <ClearIcon className={classes.rightIcon} />
      )}
    </Button>
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
