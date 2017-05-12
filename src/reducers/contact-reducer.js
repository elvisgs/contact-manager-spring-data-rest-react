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
  contact: {},
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
      payload: client.post(url, denormalizeContact(contact))
    })
  }
}

export function fetchContact(id) {
  const uri = decodeURIComponent(id)
  return (dispatch, getState, client) => {
    return dispatch({
      type: FETCH_CONTACT,
      payload: client.request({baseURL: uri})
    })
  }
}

export function updateContact(contact) {
  const uri = decodeURIComponent(contact._id)
  return (dispatch, getState, client) => {
    return dispatch({
      type: UPDATE_CONTACT,
      payload: client.patch(uri, denormalizeContact(contact))
    })
  }
}

export function deleteContact(contact) {
  const uri = decodeURIComponent(contact._id)
  return (dispatch, getState, client) => {
    return dispatch({
      type: DELETE_CONTACT,
      payload: client.delete(uri),
      meta: { deletedId: contact._id }
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
      contacts: action.payload.data._embedded.contacts.map(normalizeContact)
    }),
    REJECTED: handleError
  },

  [NEW_CONTACT]: state => ({
    ...state,
    contact: {}
  }),

  [SAVE_CONTACT]: {
    PENDING: state => ({
      ...state,
      loading: true
    }),
    FULFILLED: (state, action) => ({
      ...state,
      contacts: [...state.contacts, normalizeContact(action.payload.data)],
      errors: {},
      loading: false
    }),
    REJECTED: handleError
  },

  [FETCH_CONTACT]: {
    PENDING: (state) => ({
      ...state,
      loading: true,
      contact: {}
    }),
    FULFILLED: (state, action) => ({
      ...state,
      contact: normalizeContact(action.payload.data),
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
     const contact = normalizeContact(action.payload.data)

     return {
       ...state,
       contacts: state.contacts.map(item => item._id === contact._id ? contact : item),
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
      const id = action.meta.deletedId

      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== id),
        loading: false
      }
    },
    REJECTED: handleError
  }
}, initialState)

function normalizeContact({name: {first, last}, email, phone, _links}) {
  return {
    _id: encodeURIComponent(_links.self.href),
    firstName: first,
    lastName: last,
    email,
    phone
  }
}

function denormalizeContact({firstName, lastName, email, phone}) {
  return {
    name: {
      first: firstName,
      last: lastName
    },
    email,
    phone
  }
}

function handleError(state, action) {
  const globalError = getProp(action.payload, 'response.data.message') || action.payload.message
  let fieldErrors = getProp(action.payload, 'response.data.errors') || []
  fieldErrors = fieldErrors.reduce((obj, error) => {
    obj[error.field] = error.message
    return obj
  }, {})
  const { "name.first":firstName, "name.last":lastName, phone, email } = fieldErrors;
  const errors = { global: globalError, firstName, lastName, phone, email }

  return {
    ...state,
    errors,
    loading: false
  }
}
