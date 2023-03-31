import Navbar from './Navbar';
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import {Form, Input, Label, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import React, { useState } from 'react';
import axios from 'axios';


function App() {

  const [location, setLocation] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  async function onClickHandler(){
    await user.email
    let email = user.email
    let username = user.name
    console.log(user)
    axios.post(
        "http://127.0.0.1:5000/api/blockchain/adduser",
        {email,location,username}
        ).then(res => {
            console.log(res)
        })
  }
  return (
    isAuthenticated&&(
    <div>
        <Navbar/>
        <h1>Add User</h1>
        <p style={{color:"red"}}>If not shop owner just click submit button</p>
        <Form style={{textAlign:"left",paddingLeft:"30px",paddingRight:"30px"}}>
            <FormGroup>
            <Input id="location" name="location" placeholder="Please Enter your Location [Optional for buyers]" onChange={(e)=>setLocation(e.target.value)}/>

            <Button onClick={onClickHandler} style={{marginTop:"10px"}}>
                Submit
            </Button>
            </FormGroup>
        </Form>
    </div>)
  );
}

export default App;
