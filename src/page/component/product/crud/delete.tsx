import { Button} from "@mui/material"
import { ReactNode} from "react"
import { ProductDao } from "../../../../controller/product"
import { ToastContainer, toast } from "react-toastify"
import { useProductContext } from "../../../../context/product"

export const DeleteProduct=(prop:{children:ReactNode,productId:string})=>{
    const {refresh}=useProductContext();
    const deleteProductHandler=async(e:any)=>{
        e.preventDefault();
      const deleteProduct=  new ProductDao().deleteProduct(prop.productId);
      deleteProduct.then(data=>{data.status==200?toast.success(data.data):toast.error(data.data);refresh()})
      .catch(err=>toast.success(err.message))
    }
    return <>
    {prop.children}
    <form onSubmit={deleteProductHandler} className="p-2">
        <ToastContainer/>
        <div className="modal-footer">
            <Button type='submit'>
                submit
            </Button>
        </div>
    </form>
    </>
}