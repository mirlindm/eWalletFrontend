import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {Card, Button, Image, InputGroup, FormControl, ButtonGroup, Modal} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import eWallet from './asset/eWallet.png';
import axios from 'axios';


class App extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      walletCreation: false,
      walletID: '',
      walletBalance: 0,  
      depositShowModal: false,  
      wallets: [],
      walletListShow: false,
      
      amountToDeposit: null,
      depositResponse: [],

      withdrawalShowModal: false,
      amountToWithdraw: null,
      withdrawalResponse: [],
    }
  }

  depositHandleShow = () => {
    this.setState({depositShowModal: true})
  }

  withdrawHandleShow = () => {
    this.setState({withdrawalShowModal: true})
  }

  depositHandleClose = () => {
    this.setState({depositShowModal: false})
  }

  withdrawHandleClose = () => {
    this.setState({withdrawalShowModal: false})
  }

  changeHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
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
                this.setState({ 
                  walletID: response.data.id, 
                  walletBalance: response.data.balance,
                  walletCreation: true,
                  walletListShow: false,
                  
                });               
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

depositAmountHandler = (event) =>  {
  event.preventDefault();
  let now = new Date().toLocaleDateString();
  console.log(now.toString());

  let old_balance = this.state.walletBalance;
  let amount = this.state.amountToDeposit;
  
  let requestBody = {
    id: Math.floor((Math.random() * 10) + 1),
    amount: amount,
    timestamp: now.toString(),
    type: "EUR",
    wallet: {
      id: this.state.walletID,
      balance: old_balance,     
    }
  }

  let new_balance = +old_balance + +amount;

  axios.post('http://localhost:8080/eWallet/transactions', requestBody, {
      "accept" : "application/json"
  })
      .then(response => {
          console.log(response);
          if(response.status === 201) {       
              NotificationManager.success(`Amount Deposited: €` + response.data.amount, response.statusText)             
              this.setState({
                depositResponse: response.data,
                walletBalance: new_balance,              
                });
                setTimeout(() => {
                  this.setState({
                    depositShowModal: false
                  })
                }, 1000)              
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

listWalletsHandler = (event) => {
  event.preventDefault();
    
  axios.get('http://localhost:8080/eWallet/', {
      "accept" : "application/json"
  })
      .then(response => {
          console.log(response);
          if(response.status === 200) {       
              NotificationManager.success('Wallets Successfully Fetched', response.statusText)             
              this.setState({ 
                wallets: response.data,
                walletListShow: !this.state.walletListShow,
              });               
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

deleteWalletHandler = (event) => {
  event.preventDefault();
    
  axios.delete('http://localhost:8080/eWallet/' + this.state.walletID, {
      "accept" : "application/json"
  })
      .then(response => {
          console.log(response);
          if(response.status === 200) {       
              NotificationManager.success('Wallets Successfully Deleted', response.statusText)             
              this.setState({ 
                walletCreation: false,
              });               
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

withdrawAmountHandler = (event) =>  {
  event.preventDefault();
  let now = new Date().toLocaleDateString();
  console.log(now.toString());

  let old_balance = this.state.walletBalance;
  let amount = this.state.amountToDeposit;
  
  let requestBody = {
    id: Math.floor((Math.random() * 10) + 1),
    amount: amount,
    timestamp: now.toString(),
    type: "EUR",
    wallet: {
      id: this.state.walletID,
      balance: old_balance,     
    }
  }

  let new_balance = +old_balance + +amount;

  axios.post('http://localhost:8080/eWallet/transactions', requestBody, {
      "accept" : "application/json"
  })
      .then(response => {
          console.log(response);
          if(response.status === 201) {       
              NotificationManager.success(`Amount Deposited: €` + response.data.amount, response.statusText)             
              this.setState({
                depositResponse: response.data,
                walletBalance: new_balance,              
                });
                setTimeout(() => {
                  this.setState({
                    depositShowModal: false
                  })
                }, 1000)              
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
        <div className="col-sm-3"> 
          <div style={{textAlign: "center", margin: "50px auto",}}><Image src={eWallet}/></div>
        </div>                             
        
              <div style={{margin: "20px auto"}} className="col-sm-4">                             
                
              <h1 style={{textAlign: "center", color: "#7c795d", fontFamily: "Trocchi, serif", fontSize: "45px", margin: "10px 0" }}>Manage your eWallet</h1>
                    <Card style={{border: "1px solid #000000", }}>                         
                          <Card.Header style={{"textAlign": "center", backgroundColor: "#FF7F50"}}>
                              <Button onClick={this.createWalletHandler} className="new-buttons" variant="primary" 
                                  style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} type="submit">
                                  Create New eWallet
                              </Button> {' '}
                              <Button onClick={this.listWalletsHandler} className="new-buttons" variant="primary" 
                                  style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} type="submit">
                                  List my eWallets
                              </Button>

                              {this.state.walletListShow ?
                                this.state.wallets.map((wallet, i) =>(
                                  <div> <br/>
                                    <Card id={i} style={{ width: '18rem', border: "1px solid #FFFFFF", backgroundColor: "#FF7F50", textAlign: "center", margin: "auto"}}>
                                      <Card.Body>
                                        <Card.Title style={{color: "#FFFFFF"}}>Your eWallet: {i+1}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Currency: &euro;</Card.Subtitle>
                                        <Card.Text>
                                          <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                              <InputGroup.Text id="inputGroup-sizing-default">Balance: &euro;</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl disabled
                                              aria-label="Default"
                                              aria-describedby="inputGroup-sizing-default"
                                              value={this.state.walletBalance}
                                            />
                                          </InputGroup>
                                        </Card.Text>
                                          <ButtonGroup style={{width: "250px", marginRight: "auto", marginLeft: "auto"}} aria-label="Basic example">
                                            <Button onClick={this.depositHandleShow} variant="success">Deposit</Button>
                                            <Button onClick={this.depositHandleShow} variant="warning">Withdraw</Button>
                                            <Button variant="danger" onClick={this.deleteWalletHandler}>Delete</Button>
                                          </ButtonGroup>
                                      </Card.Body>
                                    </Card> 
                                  </div>
                                ))
                              : null } 
                              
                              {/* <Form.Control className={"bg-light"} style={{border: "1px solid #757f9a",  textAlign: "center" }} 
                                onChange={this.textAreaChangeHandler} 
                                placeholder="Enter the wallet information here" as="textarea" rows={6} />                                                                                                                       */}
                          </Card.Header> <br/>
                          
                          {this.state.walletCreation ? 
                          <div style={{textAlign: "center", margin: "auto"}}> 
                            <Card style={{ width: '18rem', backgroundColor: "#FF7F50"}}>
                              <Card.Body>
                                <Card.Title style={{color: "#FFFFFF"}}>Your eWallet: {this.state.walletID}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Currency: &euro;</Card.Subtitle>
                                <Card.Text>
                                  <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                      <InputGroup.Text id="inputGroup-sizing-default">Balance: &euro;</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl disabled
                                      aria-label="Default"
                                      aria-describedby="inputGroup-sizing-default"
                                      value={this.state.walletBalance}
                                    />
                                  </InputGroup>
                                </Card.Text>
                                  <ButtonGroup style={{width: "250px", marginRight: "auto", marginLeft: "auto"}} aria-label="Basic example">
                                    <Button onClick={this.depositHandleShow} variant="success">Deposit</Button>
                                    <Button onClick={this.withdrawHandleShow} variant="warning">Withdraw</Button>
                                    <Button variant="danger" onClick={this.deleteWalletHandler}>Delete</Button>
                                  </ButtonGroup>
                              </Card.Body>
                            </Card> <br/>
                          </div> 
                        : null }
                          
                            <Modal show={this.state.withdrawalShowModal} onHide={this.depositHandleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Deposit Amount</Modal.Title>
                              </Modal.Header>
                                <Modal.Body>                                 
                                    <InputGroup className="mb-3">                                    
                                    <FormControl value={this.state.walletID}
                                      placeholder="Enter your eWallet ID"
                                      aria-label="Amount (to the nearest euro)"
                                    />  
                                    </InputGroup>                    

                                    <InputGroup className="mb-3">
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>&euro;</InputGroup.Text>
                                        <InputGroup.Text>0.00</InputGroup.Text>
                                      </InputGroup.Prepend>
                                    <FormControl onChange={this.changeHandler} name="amountToDeposit"
                                      placeholder="Enter the Amount to Deposit"
                                      aria-label="Amount (to the nearest euro)"
                                    />  
                                    </InputGroup> 
                                </Modal.Body>
                              <Modal.Footer>
                                <Button variant="warning" onClick={this.depositHandleClose}>
                                  Cancel
                                </Button>
                                <Button variant="success" onClick={this.depositAmountHandler}>
                                  Deposit
                                </Button>
                              </Modal.Footer>
                            </Modal>

                            <Modal show={this.state.withdrawalShowModal} onHide={this.withdrawHandleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Withdraw Amount</Modal.Title>
                              </Modal.Header>
                                <Modal.Body>                                 
                                    <InputGroup className="mb-3">                                    
                                    <FormControl value={this.state.walletID}
                                      placeholder="Enter your eWallet ID"
                                      aria-label="Amount (to the nearest euro)"
                                    />  
                                    </InputGroup>                    

                                    <InputGroup className="mb-3">
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>&euro;</InputGroup.Text>
                                        <InputGroup.Text>0.00</InputGroup.Text>
                                      </InputGroup.Prepend>
                                    <FormControl onChange={this.changeHandler} name="amountToWithdraw"
                                      placeholder="Enter the Amount to Withdraw"
                                      aria-label="Amount (to the nearest euro)"
                                    />  
                                    </InputGroup> 
                                </Modal.Body>
                              <Modal.Footer>
                                <Button variant="warning" onClick={this.withdrawHandleClose}>
                                  Cancel
                                </Button>
                                <Button variant="success" onClick={this.withdrawAmountHandler}>
                                  Deposit
                                </Button>
                              </Modal.Footer>
                            </Modal>
                                                  
                                                  
                          
                          {this.state.walletCreation ?                                                                                                             
                          <Card.Footer style={{"textAlign": "center", backgroundColor: "#FF7F50"}}>                                                                    
                            <Button className="new-buttons" onClick={this.deleteWalletHandler} variant="primary" style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} >
                             Delete my Wallet
                            </Button> <br/>                      
                      </Card.Footer> 
                      :                     
                      <h1 style={{textAlign: "center", color: "#7c795d", fontFamily: "Trocchi, serif", fontSize: "25px", }}>Create a new wallet to proceed!</h1>
                      }                                                                               
                    </Card> 
                  </div>
                  <div className="col-sm-3"> 
                    <div style={{textAlign: "center", margin: "50px auto",}}><Image src={eWallet}/></div>
                  </div> 
                {/* Role Binding Policy Finish */}   
                <NotificationContainer/>                                         
        </div>      
    );
  }  

  }     
export default App;
