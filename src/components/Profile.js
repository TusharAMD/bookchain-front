import Navbar from './Navbar';
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect,useState } from 'react';
import axios from 'axios';

function Profile() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    const[qrcode,setQrcode] = useState("")

    let email = ""
    useEffect(() => {
        if (isAuthenticated){
        email = (user.email)
        axios.post(
            "http://127.0.0.1:5000/api/blockchain/getprofile",
            {email}
            ).then(res => {
                
                setQrcode(res.data.qrurl)
                //console.log(res.data.qrurl)
                console.log(qrcode)
            })
      }}, [isAuthenticated,qrcode]);

    
    return isAuthenticated && (
    <div>
        <Navbar/>
        {JSON.stringify(user)}
        <div className='profile'>
            
            <div className='shopqrcode'>
                <div ><img style={{width:"3vw",borderRadius:"100%"}} src={user.picture}></img><div style={{padding:"2px",border:"1px solid black",borderRadius:"10%",width:" 100%"}}>{user.name}</div></div>
                <div><span style={{fontSize:"4em",fontFamily: 'Alegreya Sans', color:"rgb(0, 173, 199)"}}>Book</span><span style={{fontSize:"4em",fontFamily: 'Alegreya Sans', color:"rgb(255, 221, 28)"}}>Chain</span></div>
                <img style={{minWidth: "50%",maxWidth: "80%"}} src={qrcode}></img>
                
                <img style={{width:"3em"}}src="https://i.ibb.co/WBHns9N/Pngtree-green-check-mark-icon-flat-5253210.png"></img><p style={{fontFamily: "Oswald", color:"rgb(89, 212, 0)"}}>Verify here</p>
            </div>
        </div>
        
    </div>
  );
}

export default Profile;
