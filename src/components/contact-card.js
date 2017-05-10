import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function ContactCard({contact, deleteContact}) {
  const href = encodeURIComponent(contact._links.self.href)

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {contact.name.first} {contact.name.last}
        </Card.Header>
        <Card.Description>
          <p><Icon name='phone'/> {contact.phone}</p>
          <p><Icon name='mail outline'/> {contact.email}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/contacts/edit/${href}`} className="ui button basic green">Edit</Link>
          <Button basic color="red" onClick={() => deleteContact(contact)}>Delete</Button>
        </div>
      </Card.Content>
    </Card>
  )
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired
}

export default ContactCard
