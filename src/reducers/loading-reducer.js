export default function loadingReducer(loadingState = false, {type}) {
  if (type.endsWith('PENDING')) {
    return true
  } else if (type.endsWith('FULFILLED') || type.endsWith('REJECTED')) {
    return false
  }

  return loadingState
}
