export function normalizeContact({name: {first, last}, email, phone, _links}) {
  return {
    _id: encodeURIComponent(_links.self.href),
    firstName: first,
    lastName: last,
    email,
    phone
  }
}

export function denormalizeContact({firstName, lastName, email, phone}) {
  return {
    name: {
      first: firstName,
      last: lastName
    },
    email,
    phone
  }
}
