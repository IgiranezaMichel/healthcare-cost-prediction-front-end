import { Button, NativeSelect, TextField } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { IProductDetail } from "../../../../interface/productDetail"
import { ProductDetailDao } from "../../../../controller/productDetail"
import { ToastContainer, toast } from "react-toastify"
import { ProductDao } from "../../../../controller/product"
import { countries } from "../../../../util/constant/country"

export const CreateProductDetail=(prop:{children:ReactNode})=>{
const [isloading,setIsLoading]=useState(true);
const [productList,setProductList]=useState<any>([]);
const [product,setProduct]=useState<IProductDetail>({country:'',currency:'',manufactureDate:'',manufacturer:'',price:0,productCategory:'',productName:'',quantity:0,unit:''})
const saveProductDetailHandler=async(e:any)=>{
    e.preventDefault();
    const saveProduct=  new ProductDetailDao().createProduct(product);
    saveProduct.then(data=>{data.status==201?toast.success(data.data):toast.error(data.data)})
    .catch(err=>{
        toast.error(err.request.response)
    })
}
useEffect(
    ()=>{
      new ProductDao().getAllProduct().then(data=>{setProductList(data.data);setIsLoading(false)})
    },[]
  )   
    return <form onSubmit={saveProductDetailHandler}>
    {prop.children}
    <div className="p-2">

    <span className="small">Select product</span>
    <NativeSelect onChange={e=>setProduct({...product,productId:e.target.value})} className="form-control mb-3">
            <option value="">select product</option>
            {!isloading&&productList!=undefined&&productList.length!=0
            &&productList.map((data:any)=><option value={data.id}>{data.name}</option>)}
    </NativeSelect>

    <TextField value={product.manufacturer} onChange={e=>setProduct({...product,manufacturer:e.target.value})} fullWidth label="Manufacturer" className="mb-3"/>

    <span className="small">Manufacture date</span>
    <TextField value={product.manufactureDate} onChange={e=>setProduct({...product,manufactureDate:e.target.value})} type="date" fullWidth  className="mb-3"/>

    <span className="small">Select country</span>
        <NativeSelect onChange={e=>setProduct({...product,country:e.target.value})} className="form-control mb-3">
        <option value="">select country</option>
            {countries.map(data=><option value={data}>{data}</option>)}
    </NativeSelect>

    <TextField   onChange={e=>setProduct({...product,quantity:Number(e.target.value)})} type="number" fullWidth label="Quantity" className="mb-3"/>

    <span className="small">Select unit</span>
    <NativeSelect onChange={e=>setProduct({...product,unit:e.target.value})} className="form-control mb-3">
            <option value="">select unit</option>
            <option value="l">litre</option>
            <option value="ml">milli litre</option>
    </NativeSelect>

    <div className="d-flex">
    <TextField type="number" onChange={e=>setProduct({...product,price:Number(e.target.value)})} fullWidth label="Price" className="mb-3"/>
    <NativeSelect onChange={e=>setProduct({...product,currency:e.target.value})} className="form-control mb-3">
            <option value="Frw">Frw</option>
            <option value="$">USDollar</option>
            <option value="Euro">Euro</option>
    </NativeSelect>
    </div>
        <div className="modal-footer">
            <Button type="submit">
                submit
            </Button>
        </div>
    </div>
    <ToastContainer/>
    </form>
}