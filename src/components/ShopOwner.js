import {useParams} from "react-router-dom";
import firebase from 'firebase/app';
import { useEffect, useState } from "react";

import {useCollectionData} from 'react-firebase-hooks/firestore';
import NavbarComponent from "./Navbar";
import axios from "axios";



function ShopOwner(){
    let { id } = useParams();
    const [buyers,setBuyers] = useState([])
    
    useEffect(() => {
        console.log()
        axios.post("http://127.0.0.1:5000/api/blockchain/transferrequest",{"email":id})
        .then(res=>{
            console.log(res)
            setBuyers(res.data.data)
        })
      }, []);

    function onApprove(buyer){
        console.log(buyer)
        axios.post("http://127.0.0.1:5000/api/blockchain/transferrequestapprove",{buyer})
    }

    return(
        <>
        <NavbarComponent/>
        {/*id*/}
        
        <div>

            {buyers.map((buyer, index) => {
                return (
                <div key={index}>

                    <div>
                    <p>{buyer.book_name}</p>
                    <p>{buyer.buyer_email}</p>
                    <p>{buyer.createdAt}</p>
                    </div>
                    <button onClick={()=>onApprove(buyer)}>Approve</button>
                    <hr />
                </div>
                );
            })}
        </div>
        </>
    )
    }
export default ShopOwner;