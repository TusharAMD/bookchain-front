import Navbar from './Navbar';
import {Form, Input, Label, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";



function BookPurchase(){
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [bookqr,setBookqr] = useState("")
    const [shopqr,setShopqr] = useState("")
    /*useEffect(() => {
        console.log(shopqr)
      });*/

    const [status,setStatus] = useState("")

    function onSubmitHandler(){
        console.log(bookqr,shopqr)
        const data = new FormData();
        data.append('file1', bookqr);
        data.append('filename1', bookqr.name);
        //data.append('content', new Blob([JSON.stringify({"book_name":bookname,"edition":edition,"serial_no":serial,"isbn":isbn,"classn":classn,"lang":lang})],{type:'application/json'}))
        data.append('file2', shopqr);
        data.append('filename2', shopqr.name);

        data.append('content', new Blob([JSON.stringify({"buyer_email":user.email})],{type:'application/json'}))

        console.log(typeof(bookqr))
        
        axios.post(
            "http://127.0.0.1:5000/api/blockchain/purchaserequest",
            
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(res => {
            //console.log(res.data)
            console.log(res.data.data)
            setStatus(res.data.data)
        });
    }
    return(
        <>
            <Navbar/>
            <div className='purchaseParent'>
                <div className='bookqr'>
                    Book QR
                    <Input type='file' onChange={(e)=>{setBookqr(e.target.files[0])}}/>
                    {bookqr && (
                        <>
                        <img src={URL.createObjectURL(bookqr)}/>
                        </>
                    )}
                </div>
                <div className='shopqr'>
                    Shop QR
                    <Input type='file' onChange={(e)=>{setShopqr(e.target.files[0])}}/>
                    {shopqr && (
                        <>
                        <img src={URL.createObjectURL(shopqr)}/>
                        </>
                    )}
                </div>
                
                <div style={{color:"red",fontSize:"30px"}}>{status}</div>
                
            </div>
            <Button style={{marginTop:"10px", marginLeft:"10px"}} color="success" onClick={onSubmitHandler}>Request Transfer of rights</Button>
        </>
    )
}
export default BookPurchase;