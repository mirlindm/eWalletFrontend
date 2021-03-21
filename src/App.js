import React, {Component} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {Card, Form, Button, Col, Row, Image} from 'react-bootstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import eWallet from './asset/eWallet.png';


class App extends Component { 
  constructor(props) {
    super(props);

    this.state = {           
    }
  }

  render() {    
    
    return (      
        <div className="row">                                       
              <div style={{margin: "20px auto"}} className="col-sm-8">                             
              <h1 style={{textAlign: "center", color: "#7c795d", fontFamily: "Trocchi, serif", fontSize: "45px", margin: "20px 0" }}>Manage your eWallet</h1>
                    <Card style={{border: "1px solid #000000", }}>                         
                          <Card.Header style={{"textAlign": "center", backgroundColor: "#FF7F50"}}>
                              <Button onClick={this.parseAndDeployRBPolicyHandler} className="new-buttons" variant="primary" 
                                  style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} type="submit">
                                  Create New Role Binding
                              </Button> <br/> <br/>
                              
                              <Form.Control className={"bg-light"} style={{border: "1px solid #757f9a",  textAlign: "center" }} onChange={this.textAreaChangeHandler} placeholder="Enter the Role Binding Policy Here" as="textarea" rows={6} />                            
                              <br/>
                              
                              {/* {this.state.rbPolicyShowAccordion ? 
                              <Accordion>
                              <Card>
                                <Card.Header>
                                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                  <span style={{color: "#E9967A"}}> Task-Role Map Transaction Hash </span>
                                  </Accordion.Toggle>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey="0">
                                    <Card.Body>  
                                      <span style={{color: "#008B8B", fontWeight: "bold", fontSize: "17px", }}>  <pre> {this.state.trMapResponse === '' ? <span style={{color: "#FA8072"}}> Server failed to respond. Please try again later. </span> : this.state.trMapResponse} </pre> </span> 
                                    </Card.Body>                      
                                  </Accordion.Collapse>
                                </Card>            
                              </Accordion>
                              : null } */}

                          </Card.Header> <br/>

                          <Col style={{textAlign: "center"}}>
                            <Form.Control required type="text" placeholder="Enter the Policy Binding Address" 
                              name="policyBindingAddress"
                              value={this.state.rbPolicySocketAddress}
                              onChange={this.rbPolicyChangeHandler}
                              className={"bg-light"} 
                              style={{border: "1px solid #757f9a",  textAlign: "center" }}
                            /> <br/>
                          </Col>
                                                                                                                                        
                          <Card.Footer style={{"textAlign": "center", backgroundColor: "#FF7F50"}}>                                                                    
                            <Button className="new-buttons" onClick={this.findRBPolicyMetadataHandler} variant="primary" style={{ backgroundColor: "#757f9a", border: "3px solid #d7dde8", }} >
                              Load Role Binding Policy Metadata
                            </Button> <br/>                      
                      </Card.Footer>                                                                                
                    </Card> 
                  </div>
                {/* Role Binding Policy Finish */}                                            
        </div>      
    );
  }  

  }     
export default App;
