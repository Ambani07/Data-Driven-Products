/* eslint-disable no-console */
import React from 'react'
import theme from './ProjectStats.styles'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Chart from './Chart'
import { useFirebaseConnect, isLoaded, useFirebase } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import produce from 'immer'
import ProjectAnswers from '../ProjectAnswers'

const styles = theme

const useStyles = makeStyles(styles)

function useProjects() {
  const firebase = useFirebase()
  const { projectId } = useParams()
  const completedQuizzes = []
  // Get projects from redux state

  // const data = [
  //   { name: 'Page A', uv: 4000 },
  //   { name: 'Page B', uv: 3000 },
  //   { name: 'Page C', uv: 2000 },
  //   { name: 'Page D' },
  //   { name: 'Page E', uv: 1890 },
  //   { name: 'Page F', uv: 2390 },
  //   { name: 'Page G', uv: 3490 }
  // ]

  // Attach projects listener
  useFirebaseConnect(() => [
    {
      path: 'quiz',
      queryParams: ['limitToLast=10']
      // queryParams: ['orderByChild=createdBy', `equalTo=${auth.uid}`]
    }
  ])
  // Get auth from redux state
  const auth = useSelector(state => state.firebase.auth)

  // Get project answers from redux state
  const answers = useSelector(({ firebase: { data } }) => {
    return data.projects && data.projects[projectId].answers
  })

  const quizzes = useSelector(state => state.firebase.ordered.quiz)

  if (quizzes) {
    quizzes.map(quiz => {
      if (quiz.value.projectId === projectId) {
        completedQuizzes.push(quiz.value.quiz)
      }
    })
    // console.log(completedQuizzes)
  }

  const data = []

  if (completedQuizzes.length > 0 && answers) {
    const nextState = produce(answers, draftState => {
      answers.map((projectAnswer, index) => {
        //loop through the quizzes
        let total = 0
        completedQuizzes.forEach((quiz, quizIndex) => {
          quiz.forEach(quizAnswer => {
            if (quizAnswer.id === projectAnswer.id) {
              // console.log(quizAnswer)
              total++
            }
          })
        })
        data.push({ answer: projectAnswer.text, total: total })
      })
    })

    console.log(data)
  }
  // debugger
  // })
  // answers.forEach(quiz => {
  //   const nextState = produce(completedQuizzes, draftState => {
  //     draftState.filter((answer, index) =>
  //       console.log(answer[index].id)
  //     )
  //   })
  // })

  // const nextState = produce(answers, draftState => {
  //   draftState.filter(answer =>
  //     console.log(answer.id === '710af-8c11-85cd-014b-42fd335fec8')
  //   )
  // })

  // console.log(nextState)
  // debugger
  return { data }
}
function ProjectStats({ project }) {
  const classes = useStyles()
  const { data } = useProjects()
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <h3>Project Quiz Stats</h3>
          </ListItem>
        </List>
        <Chart project={project} data={data} />
      </Grid>
    </div>
  )
}

export default ProjectStats
