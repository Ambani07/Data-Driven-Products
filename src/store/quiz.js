// ------------------------------------
// Constants
// ------------------------------------
export const ADD_QUIZ = 'ADD_QUIZ'
export const RESET_QUIZ = 'RESET_QUIZ'

// ------------------------------------
// Actions
// ------------------------------------
export function addQuiz(quiz) {
  return {
    type: ADD_QUIZ,
    payload: quiz
  }
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export function quizUpdate({ dispatch }) {
  return quiz => dispatch(addQuiz(quiz))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUIZ:
      return [...state, action.payload]
    case RESET_QUIZ:
      return (state = initialState)
    default:
      return state
  }
}
