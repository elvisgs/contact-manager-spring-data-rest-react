import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, withRouter } from 'react-router-dom'
import { Container, Icon, Message } from 'semantic-ui-react'
import ContactListPage from './pages/contact-list-page'
import ContactFormPage from './pages/contact-form-page'

class App extends Component {
  render() {
    const { errors } = this.props

    const errorMessage = (
      <Message icon error>
        <Icon name="wait" />
        <Message.Content>
          <Message.Header>{errors.global}</Message.Header>
          Is the backend server running?
        </Message.Content>
      </Message>
    )

    return (
      <Container>
        <div className="ui menu teal inverted">
          <div className="item">
            <Icon name="address book outline" size="big" />
          </div>
          <NavLink className="item" activeClassName="active" exact to="/">
            Contacts List
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/contacts/new">
            Add Contact
          </NavLink>
        </div>
        {errors.global && errorMessage}
        <Route exact path="/" component={ContactListPage} />
        <Route path="/contacts/new" component={ContactFormPage} />
        <Route path="/contacts/edit/:id" component={ContactFormPage} />
      </Container>
    )
  }
}

const connectedApp = connect(
  state => ({errors: state.errors})
)(App)

export default withRouter(connectedApp)
