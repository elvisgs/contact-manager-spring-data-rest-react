import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function ContactCard({contact, deleteContact}) {
  return (
    <Card color="teal">
      <Card.Content>
        <Image src={contact.avatar} avatar floated="left" />
        <Card.Header>
          {contact.firstName} {contact.lastName}
        </Card.Header>
        <Card.Description>
          <p><Icon name='phone'/> {contact.phone}</p>
          <p><Icon name='mail outline'/> {contact.email}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Link to={`/contacts/edit/${contact._id}`} className="ui button basic teal">Edit</Link>
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
