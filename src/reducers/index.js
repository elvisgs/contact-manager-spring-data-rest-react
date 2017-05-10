import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ContactReducer from './contact-reducer'

const rootReducer = combineReducers({
  contactStore: ContactReducer,
  form: formReducer
})

export default rootReducer
