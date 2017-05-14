import typeToReducer from 'type-to-reducer'
import { combineReducers } from 'redux'
import { normalizeContact, denormalizeContact } from './contact-utils'

const FETCH_CONTACTS = 'contact-manager/FETCH_CONTACTS'
const NEW_CONTACT = 'contact-manager/NEW_CONTACT'
const SAVE_CONTACT = 'contact-manager/SAVE_CONTACT'
const FETCH_CONTACT = 'contact-manager/FETCH_CONTACT'
const UPDATE_CONTACT = 'contact-manager/UPDATE_CONTACT'
const DELETE_CONTACT = 'contact-manager/DELETE_CONTACT'

const url = '/contacts'

const initialState = {
  contacts: [],
  contact: {},
  loading: false,
  errors: {},
}

export function fetchContacts() {
  return (dispatch, getState, client) => dispatch({
    type: FETCH_CONTACTS,
    payload: client.get(url),
  })
}

export function newContact() {
  return dispatch => dispatch({ type: NEW_CONTACT })
}

export function saveContact(contact) {
  return (dispatch, getState, client) => dispatch({
    type: SAVE_CONTACT,
    payload: client.post(url, denormalizeContact(contact)),
  })
}

export function fetchContact(id) {
  const uri = decodeURIComponent(id)
  return (dispatch, getState, client) => dispatch({
    type: FETCH_CONTACT,
    payload: client.request({ baseURL: uri }),
  })
}

export function updateContact(contact) {
  const uri = decodeURIComponent(contact._id)
  return (dispatch, getState, client) => dispatch({
    type: UPDATE_CONTACT,
    payload: client.patch(uri, denormalizeContact(contact)),
  })
}

export function deleteContact(contact) {
  const uri = decodeURIComponent(contact._id)
  return (dispatch, getState, client) => dispatch({
    type: DELETE_CONTACT,
    payload: client.delete(uri),
    meta: { deletedId: contact._id },
  })
}

const contactListReducer = typeToReducer({
  [`${FETCH_CONTACTS}_FULFILLED`]: (state, action) =>
    action.payload.data._embedded.contacts.map(normalizeContact),

  [`${SAVE_CONTACT}_FULFILLED`]: (state, action) =>
    [...state, normalizeContact(action.payload.data)],

  [`${UPDATE_CONTACT}_FULFILLED`]: (state, action) => {
    const contact = normalizeContact(action.payload.data)

    return state.map(item => (item._id === contact._id ? contact : item))
  },

  [`${DELETE_CONTACT}_FULFILLED`]: (state, action) => {
    const id = action.meta.deletedId

    return state.filter(item => item._id !== id)
  },
}, initialState.contacts)

const contactReducer = typeToReducer({
  [NEW_CONTACT]: () => initialState.contact,

  [FETCH_CONTACT]: {
    PENDING: () => initialState.contact,
    FULFILLED: (state, action) => normalizeContact(action.payload.data),
  },
}, initialState.contact)

export default combineReducers({
  contacts: contactListReducer,
  contact: contactReducer,
})
