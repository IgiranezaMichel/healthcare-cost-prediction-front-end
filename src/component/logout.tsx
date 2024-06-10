import { Button ,Avatar} from "@mui/material";
import {useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../auth';
import { ReactNode } from "react";
import { AuthenticationDao } from "../controller/authentication";
export const LogoutComponent=(prop:{children:ReactNode})=>{
    const {data}=useAuthenticationContext();
    const navigation=useNavigate();
    const handleLogout=()=>{
    new AuthenticationDao().logout().then(response=>{
        console.log(response);
        navigation("/login",{state:{success:data.name+" logout successful"}});
    }) 
    
    }
    return <>
    <div className='p-2'>
        {prop.children}
    <div className='d-flex align-items-center'>
        <Avatar src={data.profile}/> {data.name}
    </div>
       Are you sure you want to log out?
        <div className="modal-footer">
            <Button onClick={()=>handleLogout()}>Yes</Button>
        </div>
       </div>
    </>
}