import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import contactReducer from './contact-reducer'
import loadingReducer from './loading-reducer'
import errorsReducer from './errors-reducer'

const rootReducer = combineReducers({
  contactStore: contactReducer,
  form: formReducer,
  loading: loadingReducer,
  errors: errorsReducer
})

export default rootReducer
