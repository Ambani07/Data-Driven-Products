import { reduxForm } from 'redux-form'
import { DELETE_PROJECT_FORM_NAME } from 'constants/formNames'

export default reduxForm({
  form: DELETE_PROJECT_FORM_NAME,
  // Clear the form for future use (creating another project)
  onSubmitSuccess: (result, dispatch, props) => props.reset()
})
