import Navbar from './Navbar';
import {Form, Input, Label, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import React, { useState } from 'react';
import axios from 'axios';

function Home() {
    const [serial, setSSerial] = useState("");
    const [bookname, setSBookname] = useState("");
    const [edition, setSEdition] = useState("");
    const [isbn, setSISBN] = useState("");
    const [classn, setSClass] = useState("");
    const [lang, setSLang] = useState("");
    const [imagefile, setImagefile] = useState();
    const [uniqurl, setUniqurl] = useState("");
    const [qrurl, setQrurl] = useState("");

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    function setSerial(e){
        setSSerial(e.target.value)
    }
    function setBookname(e){
        setSBookname(e.target.value)
    }
    function setEdition(e){
        setSEdition(e.target.value)
    }
    function setISBN(e){
        setSISBN(e.target.value)
    }
    function setClass(e){
        setSClass(e.target.value)
    }
    function setLanguage(e){
        setSLang(e.target.value)
    }
    function onImageHandler(e){
        setImagefile(e.target.files[0])
        console.log(e.target.files[0])
    }

    async function onClickHandler(e){
        //const formData = new FormData();
        //await formData.append("File",imagefile,);

        //console.log(formData)

        const data = new FormData();
        data.append('file', imagefile);
        data.append('filename', imagefile);
        data.append('content', new Blob([JSON.stringify({"book_name":bookname,"edition":edition,"serial_no":serial,"isbn":isbn,"classn":classn,"lang":lang})],{type:'application/json'}))

        /*
        fetch('http://127.0.0.1:5000/api/blockchain/createbook', {
        method: 'POST',
        body: data,
        })*/

        axios.post(
            "http://127.0.0.1:5000/api/blockchain/createbook",
            
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(res => {
            //console.log(res.data)
            setUniqurl(res.data.uploadedId)
            setQrurl(res.data.qrcodeurl)
            console.log(uniqurl)
            console.log(qrurl)
        });
    }

    
    return (
      <div className="Home">
        <Navbar />
        <h1>Add Book</h1>
        <Form style={{textAlign:"left",paddingLeft:"30px",paddingRight:"30px"}}>
            <FormGroup>
            <Label className="me-sm-2" for="serial">Serial No</Label>
            <Input  id="serial" name="serial" placeholder="Please Enter Serial No. Eg. 190012" onChange={(e)=>setSerial(e)}/>
            <Label for="bookname">Book Name</Label>
            <Input id="bookname" name="bookname" placeholder="Please Enter Book Name. Eg. Chemistry 1 VII" onChange={(e)=>setBookname(e)}/>
            <Label for="edition">Edition Number</Label>
            <Input id="edition" name="edition" placeholder="Please Enter Edition Number. Eg. First Edition 2016" onChange={(e)=>setEdition(e)}/>
            <Label for="isbn">ISBN number</Label>
            <Input id="isbn" name="isbn" placeholder="Please Enter ISBN number Eg. 978-93-5563-048-3" onChange={(e)=>setISBN(e)}/>
            <Label for="class">Class</Label>
            <Input id="class" name="class" placeholder="Please Enter Class in roman numericals Eg. IX" onChange={(e)=>setClass(e)}/>
            <Label for="lang">Language</Label>
            <Input id="lang" name="lang" placeholder="Please Enter Language Eg. English" onChange={(e)=>setLanguage(e)}/>
            <Label for="image">Image</Label>
            <Input id="image" name="image" type="file" onChange={(e)=>onImageHandler(e)}/>
            <Button onClick={onClickHandler} style={{marginTop:"10px"}}>
                Submit
            </Button>
            <Button style={{marginTop:"10px", marginLeft:"10px"}} color="success" onClick={toggle}>
                See QR Code
            </Button>
            </FormGroup>
        </Form>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <span style={{color:"green",verticalAlign: "text-bottom",fontSize:"2em"}} className="material-symbols-outlined"> done_outline </span> Book Uploaded Successfully: <span style={{color:"green"}}>{uniqurl}</span>
        <br/><br/>
        <div>
            <b>Save this QR Code and paste it on Book!</b>
            <div>
                <img src={qrurl}></img>
            </div>
        </div>
        </ModalBody>
        
      </Modal>
      </div>
    );
  }
  
  export default Home;