import { Button, NativeSelect } from "@mui/material"
import { ReactNode, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { OperatorDao } from "../../../../controller/operator"
import { Role } from "../../../../enum/role"
import { useOperatorContext } from "../../../../context/operator"

export const ManageUserRole=(prop:{children:ReactNode,userId:string})=>{
    const [role,setRole]=useState(Role.ROLE_NEW);
    const {refresh}=useOperatorContext();
 const saveUserRoleChanges=async(e:any)=>{
    e.preventDefault();
    const saveProduct=  new OperatorDao().changeOperatorRole(prop.userId,role);
    saveProduct.then(data=>{data.status==200?toast.success(data.data):toast.error(data.data);refresh()})
    .catch(err=>toast.error(err.message))
}
   
    return <form onSubmit={saveUserRoleChanges}>
    {prop.children}
    <div className="p-2">
    <span className="small">Select role</span>
    <NativeSelect onChange={e=>setRole(e.target.value as Role)} className="form-control mb-3">
            <option value={Role.ROLE_ADMIN}>Admin</option>
            <option value={Role.ROLE_INDUSTRY}>Industry</option>
            <option value={Role.ROLE_MOH}>Mistry of health</option>
    </NativeSelect>
        <div className="modal-footer">
            <Button type="submit">
                submit
            </Button>
        </div>
    </div>
    <ToastContainer/>
    </form>
}