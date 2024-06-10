import { Email, Girl,Man, VisibilityOff, Wc } from "@mui/icons-material"
import { Avatar, Button, Card, TextField } from "@mui/material"
import { useAuthenticationContext } from "../auth"

export const Setting=()=>{
   const {data}=useAuthenticationContext();
   const img=data.profile;
    return<div className="d-flex align-items-center p-2 justify-content-center h-100 bg-light position-fixed w-100"
    style={{backgroundPosition:'fixed',backgroundSize: 'cover',backgroundImage:`url(`+img+`)`}}>
     <Card elevation={8} className="col-md-4 border rounded-0 bg-transparent" style={{backdropFilter:'blur(10px)'}}>
     <b className="p-2 text-white fs-4">Setting</b>
     <Card className="m-2 border p-2">
     <div className="d-flex align-items-center">
        <Avatar src={data.profile} sx={{width:24,height:24}}/> <div className="mx-2">{data.name}</div>
     </div>
     <div className="d-flex justify-content-between mt-3">
        <div><Email/>{data.email}</div>
        <div><Wc/>{data.gender=='Male'?<><Man/> Male</>:<><Girl/> Female</>}</div>
     </div>
     </Card>
     <Card className="m-2 border p-2">
        <TextField placeholder="Old password" className="mb-3" InputProps={{startAdornment:<VisibilityOff/>}} fullWidth/>
        <TextField placeholder="New password" className="mb-3" InputProps={{startAdornment:<VisibilityOff/>}} fullWidth/>
        <TextField placeholder="Retype password" className="mb-3" InputProps={{startAdornment:<VisibilityOff/>}} fullWidth/>
     </Card>
     <div className="modal-footer mb-1">
        <Button variant="contained" className="me-2">Submit</Button>
     </div>
     </Card>
     
    </div>
}