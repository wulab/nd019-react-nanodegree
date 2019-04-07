import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  // https://reactjs.org/docs/react-component.html#constructor
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     contacts: [
  //       {
  //         id: 'karen',
  //         name: 'Karen Isgrigg',
  //         handle: '@karenisgrigg',
  //         avatarURL: 'http://localhost:5001/karen.jpg'
  //       },
  //       {
  //         id: 'richard',
  //         name: 'Richard Kalehoff',
  //         handle: '@richardkalehoff',
  //         avatarURL: 'http://localhost:5001/richard.jpg'
  //       },
  //       {
  //         id: 'tyler',
  //         name: 'Tyler McGinnis',
  //         handle: '@tylermcginnis',
  //         avatarURL: 'http://localhost:5001/tyler.jpg'
  //       }
  //     ]
  //   };
  //   this.removeContact = this.removeContact.bind(this);
  // }

  // removeContact(contact) {
  //   this.setState(currentState => ({
  //     contacts: currentState.contacts.filter(c => c.id !== contact.id)
  //   }));
  // }

  // https://babeljs.io/blog/2015/07/07/react-on-es6-plus#property-initializers
  state = {
    contacts: [],
    screen: 'list'
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => this.setState({ contacts }));
  }

  // The body of arrow function shares the same `this` as the code that surrounds them
  // https://babeljs.io/blog/2015/07/07/react-on-es6-plus#arrow-functions
  removeContact = contact => {
    ContactsAPI.remove(contact).then(() =>
      this.setState(currentState => ({
        contacts: currentState.contacts.filter(c => c.id !== contact.id)
      }))
    );
  };

  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
          <ListContacts
            contacts={this.state.contacts}
            onRemoveContact={this.removeContact}
          />
        )}
        {this.state.screen === 'create' && <CreateContact />}
      </div>
    );
  }
}

export default App;
