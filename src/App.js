import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {Card, Button, Image, InputGroup, FormControl, ButtonGroup} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import eWallet from './asset/eWallet.png';
import axios from 'axios';


class App extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      walletCreation: false,
      walletInfo: [],           
    }
  }

  createWalletHandler = (event) =>  {
    event.preventDefault();
    
    axios.post('http://localhost:8080/eWallet/wallets', {
        "accept" : "application/json"
    })
        .then(response => {
            console.log(response);
            if(response.status === 201) {       
                NotificationManager.success('Wallet Created: ' + response.data.id + ' has been created.', response.statusText)             
                this.setState({ walletInfo: response.data});               
            } else {
                console.log(response);
                NotificationManager.warning("Please check the console for details", response.statusText)
            }
        }).catch(error => { 
            let errorMessage;
            if (error.response) {
                errorMessage = "Some unknown error occurred!";
                this.setState({errorMessage: errorMessage})
            } else if (error.request) {
                errorMessage = "The request was made but no response was received";
                this.setState({errorMessage: errorMessage})
                console.log(error.request);
            } else {
                errorMessage = error.message;
                this.setState({errorMessage: errorMessage})
                console.log('Error', error.message);
            }
            NotificationManager.warning(errorMessage, 'OOPS...');          
    });        
}

  render() {    
    
    return (      
        <div className="row">                                       
              <div style={{margin: "20px auto"}} className="col-sm-6">                             
              {/* <Image style={{width: "150px"}} src={eWallet}/> */}
              <h1 style={{textAlign: "center", color: "#7c795d", fontFamily: "Trocchi, serif", fontSize: "45px", margin: "10px 0" }}>Manage your eWallet</h1>
                    <Card style={{border: "1px solid #000000", }}>                         
                          <Card.Header style={{"textAlign": "center", backgroundColor: "#FF7F50"}}>
                              <Button onClick={this.createWalletHandler} className="new-buttons" variant="primary" 
                                  style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} type="submit">
                                  Create New Wallet
                              </Button> 
                              
                              {/* <Form.Control className={"bg-light"} style={{border: "1px solid #757f9a",  textAlign: "center" }} 
                                onChange={this.textAreaChangeHandler} 
                                placeholder="Enter the wallet information here" as="textarea" rows={6} />                                                                                                                       */}
                          </Card.Header> <br/>
                          
                          <div style={{textAlign: "center", margin: "auto"}}> 
                            <Card style={{ width: '18rem' }}>
                              <Card.Body>
                                <Card.Title>Your eWallet: {this.state.walletInfo.id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Currency: &euro;</Card.Subtitle>
                                <Card.Text>
                                  <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                      <InputGroup.Text id="inputGroup-sizing-default">Balance: &euro;</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled
                                      aria-label="Default"
                                      aria-describedby="inputGroup-sizing-default"
                                      value={this.state.walletInfo.balance}
                                    />
                                  </InputGroup>
                                </Card.Text>
                                  <ButtonGroup style={{width: "250px", marginRight: "auto", marginLeft: "auto"}} aria-label="Basic example">
                                    <Button variant="success">Deposit</Button>
                                    <Button variant="warning">Withdraw</Button>
                                    <Button variant="danger">Delete</Button>
                                  </ButtonGroup>
                              </Card.Body>
                            </Card>
                          </div> <br/>
                          
                                                  
                                                  
                          {/* <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text>$</InputGroup.Text>
                              <InputGroup.Text>0.00</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              placeholder="Recipient's username"
                              aria-label="Amount (to the nearest dollar)"
                            />  
                            </InputGroup>                       */}
                                                                                                                                        
                          <Card.Footer style={{"textAlign": "center", backgroundColor: "#FF7F50"}}>                                                                    
                            <Button className="new-buttons" onClick={this.findRBPolicyMetadataHandler} variant="primary" style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} >
                             Delete my Wallet
                            </Button> <br/>                      
                      </Card.Footer>                                                                                
                    </Card> 
                  </div>
                {/* Role Binding Policy Finish */}   
                <NotificationContainer/>                                         
        </div>      
    );
  }  

  }     
export default App;
