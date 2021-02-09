import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import TransactionPool from './TransactionPool';
import { Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { stringify } from 'uuid';


class App extends Component {
  state = { walletInfo: {} };
  fetchMineTransactions = () => {
    fetch(`${document.location.origin}/api/mine-transactions`)
      .then(response => {
        if (response.status === 200) {
          alert('success');
          history.push('/');
        } else {
          alert('The mine-transactions block request did not complete.');
        }
        
      });
      
  }

  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }));
  }
  copyCodeToClipboard = () => {
    const el = this.textArea
    el.select()
    document.execCommand("copy")
  }

  render() {
    const { address, balance } = this.state.walletInfo;
    

    return (
      
      <div className='App'>
        <img className='logo' src={logo}></img>
        
        <div>Balance:</div>
        <div>{balance}</div>
        <br />
        <div>
        <Link to='/conduct-transaction'>Send Sylver</Link></div>
        <br />
        
       
        <div className='WalletInfo'>
        

        
          <QRCode value={String(address)}
          height="50"
          bgColor="#eeeeee"
          
          />
          
          <div></div>
          <br />
        <Button
          bsStyle="primary"
          onClick={this.fetchMineTransactions}
          style={{ fontSize: 35 }}
        >
          Mine Transactions
        </Button>
        {"  "}
        <Button
          bsStyle="primary"
          onClick={() => this.copyCodeToClipboard()}
          style={{ fontSize: 35 }}
        >Copy Address</Button>
        <br></br>
        <div><b></b></div>
        <textarea
            ref={(textarea) => this.textArea = textarea}
            value={String(address)}
            style={{ fontSize: 10 }}
          />
        
        <br />
        </div>
        
      </div>
    );
  }
  
}

export default App;