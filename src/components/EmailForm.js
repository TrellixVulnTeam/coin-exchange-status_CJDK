// @format

import React, {Component} from 'react';
import fire from '../fire';

class EmailForm extends Component {
  addEmail(e) {
    e.preventDefault(); // prevents form submit from reloading the page
    fire.database().ref('emails').push(this.inputEl.value); // send the email to firebase
    this.inputEl.value = ''; // clear the form field
  }

  render() {
    return (
      <form onSubmit={this.addEmail.bind(this)}>
        <input
          type="email"
          placeholder="hank.boyd@lyte.com"
          ref={el => (this.inputEl = el)}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default EmailForm;
