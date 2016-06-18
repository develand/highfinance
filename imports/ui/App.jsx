import React, {Component, PropTypes} from 'react';

import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Account from './Account.jsx';
import {Accounts} from '../api/Accounts.js';
import {Grid} from 'react-bo otstrap';
import {IntlProvider} from 'react-intl';
import {Row, Col} from 'react-bootstrap';

// App component - represents the whole app
export default class App extends Component {
 
  renderAccounts() {
    return this.props.accounts.map((account) => (
      <Account key={account._id} account={account} />
    ));
  }

  renderAccountsHeader() {
    return (
      <Row>
        <Col md={1} xs={1}>Del</Col>
        <Col md={1} xs={1}>Fil</Col>
        <Col md={5} xs={5}>Account #</Col>
        <Col md={5} xs={5}><span className="pull-right">Balance</span></Col>
      </Row>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const accountNumber = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Accounts.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideZeroBalanceAccounts() {

  }

  hideZeroBalanceAccounts() {

  }
 
  render() {

    return (
      <IntlProvider locale="en">
        <div className="container">
          <header>
            <h1>Accounts</h1>
            <label className="hide-completed">
              <input
              type="checkbox"
              readOnly
              checked={this.props.hideZeroBalanceAccounts}
              onClick={this.toggleHideZeroBalanceAccounts.bind(this)}
              />
              Hide Zero Balance Accounts
            </label>
            <form className="new-account" onSubmit={this.handleSubmit.bind(this)}>
              <input 
              type="text"
              ref="textInput"
              placeholder="Enter new accounts here"
              />
            </form>
            <Grid fluid >
              {this.renderAccountsHeader()}
              {this.renderAccounts()}
            </Grid>
          </header> 
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  accounts: PropTypes.array.isRequired,
  hideZeroBalanceAccounts: PropTypes.bool
};

export default createContainer(() => {
  console.log("# accounts: " + Accounts.find({}).count());
  return {
    accounts: Accounts.find({}, {sort: {createdAt: -1}}).fetch()
  }
}, App);
