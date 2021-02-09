
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';
import React, { Component } from 'react';
import QrReader from 'react-qr-reader'
import { useMediaQuery } from 'react-responsive'

class ConductTransaction extends Component {
  state = { recipient: '', amount: 0, knownAddresses: [], result: 'Scan First' };
  

  
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  openImageDialog() {
    this.refs.qrReader1.openImageDialog()
}
  
  componentDidMount() {
    fetch(`${document.location.origin}/api/known-addresses`)
      .then(response => response.json())
      .then(json => this.setState({ knownAddresses: json }));
  }

  updateRecipient = event => {
    this.setState({ recipient: event.target.value });
  }

  updateAmount = event => {
    this.setState({ amount: Number(event.target.value) });
  }
  

  conductTransaction = () => {
    const { recipient, amount } = this.state;

    fetch(`${document.location.origin}/api/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, amount })
    }).then(response => response.json())
      .then(json => {
        alert(json.message || json.type);
        history.push('/transaction-pool');
      });
      this.state = { copySuccess: '' }
    
  
    }
  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

  render() {
    
    return (
    
      <div className='ConductTransaction'>
        <Link to='/'>Home</Link>
        <h3><b>Send Sylver</b></h3>
        
        <div>
        <QrReader ref="qrReader1"
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '0%', alignItems: "center"}}
          legacyMode={true}
          
          
        />
        
        <div/>
        <br></br>
        
        
      </div>
        
        <br />
        <FormGroup>
          <FormControl
            input='text'
            placeholder={this.state.result}
            value={this.state.recipient}
            onChange={this.updateRecipient}
            style={{display: 'flex', justifyContent: 'center', fontSize: 30}}
          />
          
        </FormGroup>
        <FormGroup>
          <FormControl
            input='number'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.updateAmount}
            style={{display: 'flex', justifyContent: 'center', fontSize: 30}}
            
          />
          
        </FormGroup>
        <div>
          <Button
          bsStyle="primary"
          onClick={this.openImageDialog.bind(this)}
          style={{ fontSize: 30 }}
        >
          Scan Code
        </Button>{"      "}
        <Button
            bsStyle="primary"
            onClick={this.conductTransaction}
            style={{ fontSize: 30 }}
          >
            Submit
          </Button>
          <div></div>
          <div>    </div>
          <b></b>
            <Button 
            style={{ fontSize: 30 }} 
            bsStyle="primary"
            onClick={this.copyToClipboard}
            >
              Copy Scanned Code
            </Button> 
            
          
           <br></br>
           
          <textarea
            ref={(textarea) => this.textArea = textarea}
            value={this.state.result}
            
            
          />
        
        </div>
      </div>
    )
  }
};

export default ConductTransaction;