import { Button, NativeSelect, TextField } from "@mui/material"
import { ReactNode, useState } from "react"
import { IProduct } from "../../../../interface/product"
import { EquipmentCategory } from "../../../../util/constant/equipment"
import { ProductDao } from "../../../../controller/product"
import { ToastContainer, toast } from "react-toastify"

export const CreateProduct=(prop:{children:ReactNode})=>{
    const [product,setProduct]=useState<IProduct>({
        category:'',name:''
    })
    const saveProductHandler=async(e:any)=>{
        e.preventDefault();
      const saveProduct=  new ProductDao().createProduct(product);
      saveProduct.then(data=>data.status==201?toast.success(data.data):toast.error(data.data))
      .catch(err=>toast.success(err.message))
    }
    return <>
    {prop.children}
    <form onSubmit={saveProductHandler} className="p-2">
        <TextField value={product.name}  onChange={e=>setProduct({...product,name:e.target.value})} fullWidth label="Name" className="mb-3"/>
        <span className="small">Category</span>
        <NativeSelect onChange={e=>setProduct({...product,category:e.target.value})} className="form-control mb-2">
            <option value="">select product category</option>
            {EquipmentCategory.map(data=><option value={data}>{data}</option>)}
        </NativeSelect>
        <ToastContainer/>
        <div className="modal-footer">
            <Button type='submit'>
                submit
            </Button>
        </div>
    </form>
    </>
}