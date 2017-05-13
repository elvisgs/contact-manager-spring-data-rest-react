import React, { PureComponent} from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { Redirect } from 'react-router-dom'
import ContactForm from '../components/contact-form'
import {
  newContact, saveContact,
  fetchContact, updateContact
} from '../reducers/contact-reducer'

class ContactFormPage extends PureComponent {
  state = {
    redirect: false
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      this.props.fetchContact(id)
        .catch(err => this.setState({redirect: true}))
    } else {
      this.props.newContact()
    }
  }

  async submit(contact) {
    try {
      if (contact._id)
        await this.props.updateContact(contact)
      else
        await this.props.saveContact(contact)

      this.setState({redirect: true})
    } catch (err) {
      throw new SubmissionError(this.props.errors)
    }
  }

  render() {
    const { contact, loading } = this.props
    return (
      <div>
        {
          this.state.redirect ?
            <Redirect to="/" /> :
            <ContactForm  contact={contact} loading={loading} onSubmit={this.submit.bind(this)} />
        }
      </div>
    )
  }
}

const mapStateToProps = ({contactStore: {contact}, loading, errors}) => ({
  contact,
  loading,
  errors
})

export default connect(
  mapStateToProps,
  {newContact, saveContact, fetchContact, updateContact}
)(ContactFormPage)
