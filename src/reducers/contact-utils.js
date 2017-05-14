import { createHash } from 'crypto'

export function normalizeContact({ name: { first, last }, email, phone, _links }) {
  const hash = createHash('md5').update(email).digest('hex')
  const fallback = encodeURIComponent(`https://api.adorable.io/avatars/60/${hash}.png`)
  const avatar = `https://www.gravatar.com/avatar/${hash}?d=${fallback}`

  return {
    _id: encodeURIComponent(_links.self.href),
    firstName: first,
    lastName: last,
    email,
    phone,
    avatar,
  }
}

export function denormalizeContact({ firstName, lastName, email, phone }) {
  return {
    name: {
      first: firstName,
      last: lastName,
    },
    email,
    phone,
  }
}
