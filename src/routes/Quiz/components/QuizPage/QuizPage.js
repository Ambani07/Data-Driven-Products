/* eslint-disable no-console */
import React, { useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import styles from './QuizPage.styles'
import { useSelector } from 'react-redux'
import ClearIcon from '@material-ui/icons/Clear'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
// import { addQuiz } from '../../../../store/quiz'
import Button from '@material-ui/core/Button'
import uuid from 'react-uuid'
import { useFirebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase'

import Quiz from './Quiz'

import LoadingSpinner from 'components/LoadingSpinner'
const useStyles = makeStyles(styles)

function complete() {
  return <h1>Thank you for taking your time to complete our quiz!...</h1>
}

function quizzez(answer, classes) {
  return <Quiz answer={answer} classes={classes} />
}

function useProjects() {
  const firebase = useFirebase()
  const projectQuiz = JSON.parse(localStorage.getItem('quiz'))
  const auth = useSelector(state => state.firebase.auth)
  const quiz = useSelector(state => state.quiz)
  const submitQuiz = () => {
    if (quiz.length !== 0) {
      const newQuiz = {
        projectId: projectQuiz.productId,
        quiz: quiz
      }
      return firebase
        .push('quiz', {
          id: uuid(),
          ...newQuiz,
          createdBy: auth.uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
        .catch(err => {
          console.error('Error:', err) // eslint-disable-line no-console
          // showError(err.message || 'Could not add project')
          return Promise.reject(err)
        })
    }
  }
  // Attach todos listener
  useFirebaseConnect(() => [
    {
      path: 'projects',
      queryParams: ['limitToLast=10']
      // queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`]
    }
  ])

  // Get project answers from redux state
  const product = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectQuiz.productId]
  })

  // Get project answers from redux state
  const answers = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectQuiz.productId].answers
  })

  return { product, answers, submitQuiz, quiz }
}

function QuizPage() {
  const [completed, clickedDoneButton] = useState(false)
  const classes = useStyles()
  const { product, answers, submitQuiz, quiz } = useProjects()
  const submitQuizHandler = () => {
    if (quiz.length !== 0) {
      submitQuiz()
      clickedDoneButton(true)

      setTimeout(() => {
        clickedDoneButton(false)
      }, 10000)
    }
  }
  if (answers) {
    return (
      <div className={classes.root} style={{ textAlign: 'center' }}>
        <Typography variant="h2"> {product.name} </Typography>
        <h3>Welcome to your dreams.</h3>
        <Grid container direction="row" justify="center" alignItems="baseline">
          {completed === false ? (
            answers !== null ? (
              answers.map(answer => (
                <Grid item xs={3}>
                  {quizzez(answer, classes)}
                </Grid>
              ))
            ) : (
              <h1>No Answers</h1>
            )
          ) : (
            complete()
          )}
        </Grid>
        <Grid container direction="row" justify="center" alignItems="baseline">
          <Grid item xs={12} style={{ marginTop: '5%' }}>
            {completed === false ? (
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={submitQuizHandler}>
                Done
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return <LoadingSpinner />
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz
  }
}

const resetQuiz = () => ({
  type: 'RESET_QUIZ'
})

const mapDispatchToProps = dispatch => {
  return {
    resetQuiz: () => dispatch(resetQuiz())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizPage)
