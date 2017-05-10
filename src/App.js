import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Container, Icon } from 'semantic-ui-react'
import ContactListPage from './pages/contact-list-page'
import ContactFormPage from './pages/contact-form-page'

class App extends Component {
  render() {
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
        <Route exact path="/" component={ContactListPage}/>
        <Route path="/contacts/new" component={ContactFormPage}/>
        <Route path="/contacts/edit/:href" component={ContactFormPage}/>
      </Container>
    )
  }
}

export default App
