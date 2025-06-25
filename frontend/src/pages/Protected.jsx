import React, { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import Cookies from "js-cookie"; 
function Protected({children }){
    const navigate = useNavigate() ;
    const [loading , setLoading] = useState(true); 

    useEffect(()=>{
        const token = Cookies.get("token"); 
        console.log(token); 
        if(!token){
            navigate("/")
        }
        setLoading(false)

    },[navigate])

    if(loading){
        return <div>loading...</div>
    }
    return children||null;

}
export default Protected