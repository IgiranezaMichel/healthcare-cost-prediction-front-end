import { LockPerson, VisibilityOff } from "@mui/icons-material"
import { Box, Button, Card, Chip, IconButton, TextField } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { Role } from "../../enum/role";

export const Login=()=>{
    const location=useLocation();
    const navigation=useNavigate();
    const [loginState,setLoginState]=useState(location.state);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const deleteIconHandler=()=>{
        location.state=null;
        setLoginState(null);
    }
    const loginHandler=async(e:any)=>{
        e.preventDefault()
        const form=new FormData();
        form.append('username',email);
        form.append('password',password);
       const response=await axios.post("http://localhost:8080/login",form,{withCredentials:true});
       if(response.request.responseURL=='http://localhost:8080/login?error'){
        toast.error('Invalid username or password')
       }else{
        const responseData=JSON.parse(response.request.response);
        if(responseData.role=='ROLE_NEW'){
            navigation("/moh");
        }
        else if(responseData.role==Role.ROLE_ADMIN){
            navigation("/admin");
        }
        else if(responseData.role==Role.ROLE_INDUSTRY){
            navigation("/industry");
        }
        if(responseData.role==Role.ROLE_MOH){
            navigation("/moh");
        }
       }
        
    }
    useEffect(
        ()=>{},[loginState]
    )
    return <main className="fixed-top col-12 m-auto d-flex align-items-center w-100 h-100 ui-login-bg-img">
    <Box className="row col-12  m-auto h-100">
        <Box className='col-sm-6 d-d-none d-md-block  h-100' sx={{backgroundColor:'rgba(20,50, 255,0.5)',backdropFilter:'blur(4px)'}}>

        </Box>
        <Box className='col-sm-6 h-100 d-flex justify-content-center align-items-center'>
            <Card elevation={9} className="col-md-8 bg-white p-2">
                <div className="col-2 m-auto mb-1 mt-3">
                    <img src="login.png"  className='card-img'alt="" />
                </div>
                <div className="fw-bold fs-3 text-center mb-3">Login</div>
                <form onSubmit={loginHandler}>
                        <TextField value={email}onChange={e=>setEmail(e.target.value)} placeholder="Username" fullWidth className="mb-3" InputProps={{endAdornment:<IconButton><LockPerson/></IconButton>}}/>
                        <TextField type="password" value={password}onChange={e=>setPassword(e.target.value)} placeholder="Password" fullWidth className="mb-3" InputProps={{endAdornment:<IconButton><VisibilityOff/></IconButton>}}/>
                        <div className="text-center">
                            {loginState!=null&&<Chip color={loginState.success?"success":'error'} onDelete={deleteIconHandler} label={loginState.success?loginState.success:loginState.error}/>}
                        </div>
                        <div className="modal-footer">
                            <Button type="submit" variant="contained">Submit</Button>
                        </div>
                    </form>
            </Card>
        </Box>
    </Box>
    <ToastContainer/>
    </main>
}