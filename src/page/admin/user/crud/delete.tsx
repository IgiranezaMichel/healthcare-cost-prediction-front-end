import { Button} from "@mui/material"
import { ReactNode} from "react"
import { ToastContainer, toast } from "react-toastify"
import { OperatorDao } from "../../../../controller/operator"
import { useOperatorContext } from "../../../../context/operator"

export const DeleteUser=(prop:{children:ReactNode,userId:string})=>{
    const {refresh}=useOperatorContext();
    const deleteUserHandler=async(e:any)=>{
        e.preventDefault();
      const deleteUser=  new OperatorDao().deleteOperator(prop.userId);
      deleteUser.then(data=>{data.status==200?toast.success(data.data):toast.error(data.data);refresh()})
      .catch(err=>toast.success(err.message))
    }
    return <>
    {prop.children}
    <form onSubmit={deleteUserHandler} className="p-2">
        <ToastContainer/>
        <div className="modal-footer">
            <Button type='submit'>
                submit
            </Button>
        </div>
    </form>
    </>
}