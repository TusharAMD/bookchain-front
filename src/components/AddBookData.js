import NavbarComponent from "./Navbar";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Input,Button } from "reactstrap";
import axios from "axios";

const fileTypes = ["PDF","JPG"];
function AddBookData(){
    const [file, setFile] = useState(null);
    const [bookname, setBookname] = useState("");
    const [edition, setEdition] = useState("");
    const [classn, setClassn] = useState("V");
    const [isbn, setIsbn] = useState("");
    const [coverpage,setCoverpage] = useState("");

    const handleChange = (file) => {
        setFile(file);
        console.log(file)
    };

    function onSubmitHandler(){
        console.log(file,bookname,edition,classn,isbn)
        const data = new FormData();
        data.append('file', file);
        data.append('filename', file.name);
        data.append('content', new Blob([JSON.stringify({bookname,edition,classn,isbn,coverpage})],{type:'application/json'}))
        
        axios.post(
            "http://127.0.0.1:5000/api/blockchain/addbookdata",
            
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ).then(res => {
            console.log(res)
        });
    }
    return(
        <>
        <NavbarComponent/>
        
        <div className="filedragndropwrapper">
        <div className="filedragndrop">
            <p>Upload Book</p>
            <Input value={bookname} onChange={(e)=>setBookname(e.target.value)} placeholder="Name of the Book"/>
            <Input value={edition} onChange={(e)=>setEdition(e.target.value)} placeholder="Edition"/>
            <Input value={classn} onChange={(e)=>setClassn(e.target.value)} placeholder="Class"
                type="select">
                <option>V</option><option>VI</option><option>VII</option><option>VIII</option><option>IX</option><option>X</option>
            </Input>
            <Input value={isbn} onChange={(e)=>setIsbn(e.target.value)} placeholder="ISBN"/>
            <Input value={coverpage} onChange={(e)=>setCoverpage(e.target.value)} placeholder="Cover Page Url"/>

            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />

            <Button style={{marginTop:"10px", marginLeft:"10px"}} color="success" onClick={onSubmitHandler}>Submit</Button>
        </div>
        </div>
        </>
    )
}
export default AddBookData;