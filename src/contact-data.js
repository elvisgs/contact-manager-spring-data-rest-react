export const contacts = [
  {
    name: {
      first: "John",
      last: "Doe"
    },
    phone: "555",
    email: "john@gmail.com",
    _links: {
      contact: {
        href: "http://localhost:8080/contacts/1"
      },
      self: {
        href: "http://localhost:8080/contacts/1"
      }
    }
  },
  {
    name: {
      first: "Bruce",
      last: "Wayne"
    },
    phone: "777",
    email: "bruce.wayne@gmail.com",
    _links: {
      contact: {
        href: "http://localhost:8080/contacts/2"
      },
      self: {
        href: "http://localhost:8080/contacts/2"
      }
    }
  }
]
