import typeToReducer from 'type-to-reducer'
import getProp from 'lodash/get'

const FETCH_CONTACTS = 'contact-manager/FETCH_CONTACTS'
const NEW_CONTACT = 'contact-manager/NEW_CONTACT'
const SAVE_CONTACT = 'contact-manager/SAVE_CONTACT'
const FETCH_CONTACT = 'contact-manager/FETCH_CONTACT'
const UPDATE_CONTACT = 'contact-manager/UPDATE_CONTACT'
const DELETE_CONTACT = 'contact-manager/DELETE_CONTACT'

const url = '/contacts'

const initialState = {
  contacts: [],
  contact: {name: {}},
  loading: false,
  errors: {}
}

export function fetchContacts() {
  return (dispatch, getState, client) => {
    return dispatch({
      type: FETCH_CONTACTS,
      payload: client.get(url)
    })
  }
}

export function newContact() {
  return dispatch => {
    dispatch({type: NEW_CONTACT})
  }
}

export function saveContact(contact) {
  return (dispatch, getState, client) => {
    return dispatch({
      type: SAVE_CONTACT,
      payload: client.post(url, contact)
    })
  }
}

export function fetchContact(rel) {
  rel = decodeURIComponent(rel)
  return (dispatch, getState, client) => {
    return dispatch({
      type: FETCH_CONTACT,
      payload: client.request({baseURL: rel})
    })
  }
}

export function updateContact(contact) {
  const uri = contact._links.self.href
  return (dispatch, getState, client) => {
    return dispatch({
      type: UPDATE_CONTACT,
      payload: client.put(uri, contact)
    })
  }
}

export function deleteContact(contact) {
  const uri = contact._links.self.href
  return (dispatch, getState, client) => {
    return dispatch({
      type: DELETE_CONTACT,
      payload: client.delete(uri),
      meta: { deletedUri: uri }
    })
  }
}

export default typeToReducer({
  [FETCH_CONTACTS]: {
    PENDING: state => ({
      ...state,
      loading: true
    }),
    FULFILLED: (state, action) => ({
      ...state,
      loading: false,
      contacts: action.payload.data._embedded.contacts
    }),
    REJECTED: handleError
  },

  [NEW_CONTACT]: state => ({
    ...state,
    contact: {name: {}}
  }),

  [SAVE_CONTACT]: {
    PENDING: state => ({
      ...state,
      loading: true
    }),
    FULFILLED: (state, action) => ({
      ...state,
      contacts: [...state.contacts, action.payload.data],
      errors: {},
      loading: false
    }),
    REJECTED: handleError
  },

  [FETCH_CONTACT]: {
    PENDING: (state) => ({
      ...state,
      loading: true,
      contact: {name: {}}
    }),
    FULFILLED: (state, action) => ({
      ...state,
      contact: action.payload.data,
      loading: false,
      errors: {}
    }),
    REJECTED: handleError
  },

  [UPDATE_CONTACT]: {
    PENDING: (state) => ({
      ...state,
      loading: true
    }),
    FULFILLED: (state, action) => {
     const contact = action.payload.data

     return {
       ...state,
       contacts: state.contacts.map(item => areEqual(item, contact) ? contact : item),
       loading: false,
       errors: {}
     }
    },
    REJECTED: handleError
  },

  [DELETE_CONTACT]: {
    PENDING: (state) => ({
      ...state,
      loading: true
    }),
    FULFILLED: (state, action) => {
      const uri = action.meta.deletedUri
      return {
        ...state,
        contacts: state.contacts.filter(item => item._links.self.href !== uri),
        loading: false
      }
    },
    REJECTED: handleError
  }
}, initialState)

function handleError(state, action) {
  const globalError = getProp(action.payload, 'response.data.message') || action.payload.message
  let fieldErrors = getProp(action.payload, 'response.data.errors') || []
  fieldErrors = fieldErrors.reduce((obj, error) => {
    obj[error.field] = error.message
    return obj
  }, {})
  const { "name.first":first, "name.last":last, phone, email } = fieldErrors;
  const errors = { global: globalError, name: { first, last }, phone, email }

  return {
    ...state,
    errors,
    loading: false
  }
}

function areEqual(contact1, contact2) {
  return contact1._links.self.href === contact2._links.self.href
}
