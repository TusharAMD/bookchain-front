import { useState } from "react";
import axios from "axios";
import NavbarComponent from './Navbar';
import {Form, Input, Label, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
function Chain(){
    
    const [bookqr,setBookqr] = useState("")
    const [chainarr,setChainArr] = useState([])

    function onSubmitHandler(){

        const data = new FormData();
        data.append('file1', bookqr);
        data.append('filename1', bookqr.name);

        console.log("buttin")
        axios.post(
            "http://127.0.0.1:5000/api/blockchain/checkchain",
            
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(res => {
            //console.log(res.data)
            console.log(res.data)
            setChainArr(res.data.chain)

        });
    }

    return(
    <>
    <NavbarComponent/>
    Chain
    <div className='purchaseParent'>
                <div className='bookqr'>
                    <Input type='file' onChange={(e)=>{setBookqr(e.target.files[0])}}/>
                    {bookqr && (
                        <>
                        <img src={URL.createObjectURL(bookqr)}/>
                        </>
                    )}
                    <button onClick={()=>onSubmitHandler()}>Check Chain</button>

                </div>
                
    </div>
    <div style={{display:"flex", justifyContent:"center"}}>
    <div style={{border:"2px black solid", padding:"20px"}}>
    {chainarr.map((item, i) => {

    return(<>
    
    <img width="20px" src="https://i.ibb.co/W3fZJG6/58f8bcf70ed2bdaf7c128307-1.png"></img>
    <p>{item}</p>
   
    
    
    </>);

    })}
    </div>
    </div>
    </>
    )
}

export default Chain