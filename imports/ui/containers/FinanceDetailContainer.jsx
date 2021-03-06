import React, { Component, PropTypes } from 'react';
import {AccountsCollection} from '/collections/AccountsCollection.js';
import {Panel, Tabs, Tab} from 'react-bootstrap';
import AccountOverview from '../components/AccountOverview.jsx';
import PositionsList from '../components/PositionsList.jsx';

export default class FinanceDetailContainer extends Component {

  render() {
    return (
      <Panel className="finance-detail-container">
        <Tabs id="finance-detail-container">
          <Tab className="finance-detail-tab" eventKey={1} title="Overview">
            <h2>Overview</h2>
            <AccountOverview accounts={this.props.accounts} />
          </Tab>
          <Tab eventKey={2} title="Trends">Trends</Tab>
          <Tab eventKey={3} title="Positions">
            <PositionsList accountsCollection={AccountsCollection} />
          </Tab>
        </Tabs>
      </Panel>
    );
  }

  handleAddAccount(accountNumber) {
    AccountsCollection.insert({accountNumber: accountNumber, balance: 0, createdAt: new Date()});
  }
}

FinanceDetailContainer.propTypes = {
  accounts: PropTypes.array.isRequired,
};

