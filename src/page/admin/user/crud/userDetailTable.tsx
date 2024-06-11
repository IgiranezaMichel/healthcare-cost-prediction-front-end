import { Boy, Close, Delete,Girl, LockPerson, Search } from "@mui/icons-material"
import {  Avatar, Card, Chip, Dialog, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import {  useEffect, useState } from "react";
import { IPage } from "../../../../interface/page";
import { Role } from "../../../../enum/role";
import { DeleteUser } from "./delete";
import { ManageUserRole } from "./manageRole";
import { useOperatorContext } from "../../../../context/operator";
const column=[
   '#', 'Name','gender','email','role','Action'
]
export const DisplayUserTable=()=>{
  const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:''});
  const [user,setUser]=useState({id:'',name:'',photo:'',open:false});
  const [userRole,setUserRole]=useState({id:'',name:'',photo:'',open:false});
  const {data,setData}=useOperatorContext();
  useEffect( 
    ()=>{
      setData(page);
    },[page]
  )
    return<>
      
    <div className="d-flex align-items-center justify-content-between">
    
    <div className="fw-bold  mt-3 mb-2 small">System user Table</div>
    <TextField value={page.search} onChange={e=>setPage({...page,search:e.target.value})} sx={{'& .MuiInputBase-root':{height:30}}} placeholder="Search user ..." InputProps={{endAdornment:<IconButton><Search/></IconButton>}}/>
    </div>
     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '50dvh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
               {column.map(data=><TableCell >
                 {data}
                </TableCell>) }
            </TableRow>
          </TableHead>
          <TableBody>
          {data!=undefined&&data.content!=undefined&&data.content.length!=0&&data.content.map((data:any,index:number)=><TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                           {index+1}  
                        </TableCell>
                        <TableCell ><div className="d-flex align-items-center"><Avatar sx={{width:35,height:35}} src={data.profile} className="me-2"/> {data.name}</div></TableCell>
                        <TableCell >{data.gender=='Male'?<><Boy/> Male</>:<><Girl/> Female</>}    </TableCell>
                        <TableCell >{data.email}</TableCell>
                        <TableCell ><LockPerson/> {data.role==Role.ROLE_NEW?<>New User</>:
                        data.role==Role.ROLE_ADMIN?<>System admin</>:data.role==Role.ROLE_INDUSTRY?<>Industry Representative</>
                        :data.role==Role.ROLE_MOH?<>Minister</>:''}</TableCell>
                         <TableCell >
                          <div className="d-flex">
                          <IconButton onClick={()=>{setUser({id:data.id,name:data.name,photo:data.profilePicture,open:true})}}><Delete className='small'/> </IconButton>   
                          <IconButton onClick={()=>{setUserRole({id:data.id,name:data.name,photo:data.profilePicture,open:true})}}><LockPerson className='small'/> </IconButton> 
                            </div>  
                            </TableCell>
                  </TableRow>)}
                  {data!=undefined&&data.content!=undefined&&data.content.length==0&& <TableRow>
                <TableCell colSpan={12} className="text-center">
                    <Chip label='No data found'/></TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
       <Card className="p-2 float-end">
        <Pagination/>
       </Card>
    </Paper>
    <Dialog open={user.open}>
    <DeleteUser userId={user.id}>
    <section className="d-flex align-items-center justify-content-between p-2">
              <div>Delete user</div> <IconButton onClick={()=>setUser({...user,open:false})}><Close/></IconButton>
            </section>
            <section className="p-2 fw-bold text-center">Delete user</section>
            <div className="p-1">Are you sure you want to delete <b>{user.name}</b> ?</div>
        </DeleteUser>
    </Dialog>
    <Dialog open={userRole.open}>
    <ManageUserRole userId={userRole.id}>
    <section className="d-flex align-items-center justify-content-between p-2">
              <div>Manage user role</div> <IconButton onClick={()=>setUserRole({...user,open:false})}><Close/></IconButton>
            </section>
            <section className="p-2 fw-bold text-center">Manage role</section>
            <div className="p-1">Are you sure you want to delete <b>{user.name}</b> ?</div>
        </ManageUserRole>
    </Dialog>
    
    </> 
}