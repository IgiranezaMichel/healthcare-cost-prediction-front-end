import { LockPerson, Man, Person, VisibilityOff, Woman } from "@mui/icons-material"
import { Avatar, Box, Button, Card, Checkbox, IconButton, TextField } from "@mui/material"
import React, { useState } from "react"
import { IOperator } from "../../interface/operator"
import { Role } from "../../enum/role"
import { OperatorDao } from "../../controller/operator"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const SignUp=()=>{
    const [operator,setOperator]=useState<IOperator>({
        email:'',gender:'',name:'',profile:'',role:Role.ROLE_NEW
    });
    const navigation=useNavigate();
    const [password,setPassword]=useState('');
    const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setOperator({ ...operator, profile: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const saveOperator=async(e:any)=>{  
        e.preventDefault();
        new OperatorDao().createOperator(operator,password)
        .then(data=>{if(data.status==201){
            toast.success(data.data)
            navigation("/login",{state:{success:data.data}})
        }
        else{
            console.log(data);
            
            toast.error(data.data);
        }
    })
        .catch(err=>{toast.error(err.request.response);console.log(err.request.response);
        })
    }
    return <main className="fixed-top col-12 m-auto d-flex align-items-center w-100 h-100 ui-login-bg-img">
    <Box className="row col-12  m-auto h-100">
        <Box className='d-none d-md-block col-sm-6    h-100' sx={{backgroundColor:'rgba(20,50, 255,0.5)',backdropFilter:'blur(4px)'}}>
        </Box>
        <Box className='col-12 col-sm-6  h-100 d-flex  justify-content-center align-items-center'>
            <Card elevation={9} className="col-md-8 bg-white p-2">
                <form onSubmit={saveOperator}>
                <div className="col-2 m-auto mb-1 mt-3">
                    <Avatar sx={{width:60,height:60}} src={operator.profile.length==0?"signup.png":operator.profile}  className='card-img 'alt="" />
                </div>
                <div className="fw-bold fs-3 text-center mb-3">Sign Up</div>
                <section>
                        <TextField sx={{'& .MuiInputBase-root':{height:50}}} required value={operator.name} onChange={e=>setOperator({...operator,name:e.target.value})} placeholder="Name" fullWidth className="mb-3" InputProps={{startAdornment:<IconButton><LockPerson/></IconButton>}}/>
                        Gender
                        <div>
                        <span className="me-2"><Checkbox checked={operator.gender=='Male'} onClick={()=>setOperator({...operator,gender:'Male'})}  icon={<Man/>}/>Male</span>
                        <span><Checkbox checked={operator.gender=='Female'} onClick={()=>setOperator({...operator,gender:'Female'})} icon={<Woman/>}/>Female</span>
                        </div>

                        <TextField required type='file' onChange={imgHandler}  fullWidth className="mb-3" InputProps={{startAdornment:<IconButton>Profile</IconButton>}}/>
                        <TextField required type="email" value={operator.email} onChange={e=>setOperator({...operator,email:e.target.value})} placeholder="Email" fullWidth className="mb-3" InputProps={{startAdornment:<IconButton><Person/></IconButton>}}/>
                        <TextField required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" fullWidth className="mb-3" InputProps={{startAdornment:<IconButton><VisibilityOff/></IconButton>}}/>
                        <div className="modal-footer">
                            <Button variant="contained" type="submit">Submit</Button>
                        </div>
                    </section>
                </form>
                <ToastContainer/>
            </Card>
        </Box>
    </Box>
    </main>
}