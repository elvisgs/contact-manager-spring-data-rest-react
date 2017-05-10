import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { client } from './client'

const middleware = composeWithDevTools(applyMiddleware(
  promise(),
  thunk.withExtraArgument(client)
))

export default createStore(rootReducer, middleware)
