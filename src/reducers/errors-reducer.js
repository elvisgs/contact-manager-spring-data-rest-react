import getProp from 'lodash/get'

export default function errorsReducer(errorState = {}, action) {
  const type = action.type

  if (type.endsWith('REJECTED')) {
    return mapErrors(action.payload)
  } else if (type.endsWith('FULFILLED')) {
    return {}
  }

  return errorState
}

function mapErrors(payload) {
  const globalError = getProp(payload, 'response.data.message') || payload.message
  let fieldErrors = getProp(payload, 'response.data.errors') || []

  fieldErrors = fieldErrors.reduce((obj, error) => ({
    ...obj,
    [error.field]: error.message,
  }), {})

  const { 'name.first': firstName, 'name.last': lastName, phone, email } = fieldErrors
  const errors = { global: globalError, firstName, lastName, phone, email }

  return errors
}
