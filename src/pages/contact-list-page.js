import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ContactList from '../components/contact-list'
import { Loader, Confirm } from 'semantic-ui-react'
import { fetchContacts, deleteContact } from '../reducers/contact-reducer'

class ContactListPage extends PureComponent {
  state = {
    showConfirm: false,
    contact: null
  }

  componentDidMount() {
    this.props.fetchContacts()
  }

  handleDeleteContact = (contact) => this.setState({
    showConfirm: true,
    contact
  })

  handleConfirm = () => {
    this.props.deleteContact(this.state.contact)
    this.resetState()
  }

  handleCancel = () => this.resetState()

  resetState() {
    this.setState({
      showConfirm: false,
      contact: null
    })
  }

  render() {
    const { contacts, errors, loading } = this.props

    return (
      <div>
        <h1>List of Contacts</h1>
        <ContactList
          contacts={contacts}
          deleteContact={this.handleDeleteContact}
          errors={errors}
          loading={loading}
        />

        <Confirm
          open={this.state.showConfirm}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm} />

        <Loader active={this.props.loading} />
      </div>
    )
  }
}

const mapStateToProps = ({contactStore: {contacts, loading, errors}}) => ({
  contacts,
  loading,
  errors
})

export default connect(
  mapStateToProps,
  {fetchContacts, deleteContact}
)(ContactListPage)
