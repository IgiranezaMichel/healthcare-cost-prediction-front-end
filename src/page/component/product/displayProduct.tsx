import {  Close, Search } from "@mui/icons-material"
import { Box, Button,  Dialog,  IconButton, Slide, TextField } from "@mui/material"
import { useState } from "react"
import { ProductSummary } from "./crud/productSummary"
import { DisplayProductDetail } from "./crud/productDetail"
import { CreateProduct } from "./crud/createProduct"
import { CreateProductDetail } from "./crud/createNewProductDetail"
import TypingAnimation from "../../visitor/animation"
import { ProductCostPrediction } from "./crud/prediction/productPrediction"
import { useAuthenticationContext } from "../../../auth"
export const DisplayProduct=()=>{
  const [show,setShow]=useState(0);
  const [search,setSearch]=useState('');
  const [createProduct,setCreateProduct]=useState(false);
  const [prediction,setPrediction]=useState(false);
  const [createProductDetail,setCreateProductDetail]=useState(false);
  const active="border-bottom fw-bolder border-2 border-primary rounded-0";
  const inActive="text-black";
  const {data}=useAuthenticationContext();
  
    return<>
    <div className="fw-bold fs-5 mt-2 mb-2">Manage Product</div>
    <Box className='mb-4 '>
      <Button onClick={()=>setShow(0)} className={show==0?active:inActive}>summary</Button>
      <Button onClick={()=>setShow(1)} className={show==1?active:inActive}>detail</Button>
    </Box>
    <div className=" d-flex justify-content-between">
        <TextField onChange={e=>setSearch(e.target.value)} sx={{'& .MuiInputBase-root':{height:35}}}
         placeholder="Search product ..." InputProps={{endAdornment:<IconButton><Search/></IconButton>}}/>
        <div>
        {data.role=='ROLE_MOH'&&<Button size="large" variant="contained"onClick={()=>setPrediction(true)} className="me-3 fw-bolder px-1" sx={{p:0}}>Prediction</Button>}
        {data.role=='ROLE_INDUSTRY'&&<Button onClick={()=>{show==0?setCreateProduct(true):setCreateProductDetail(true)}} size="large" variant="contained" sx={{p:0}}>new</Button>}
        </div>
    </div>
  <div>
    {/* dialogue */}
  <Dialog TransitionComponent={Slide} open={createProduct} maxWidth='xs' PaperProps={{className:'col-12'}}>
    <CreateProduct>
        <section className="d-flex bg-primary justify-content-between p-2 sticky-top text-white align-items-center">
        <div>Add new product</div>
        <IconButton onClick={()=>setCreateProduct(false)}><Close/></IconButton>
        </section>
        <div className="text-center fw-bold fs-6">Add new product</div>
      </CreateProduct>
    </Dialog>

    <Dialog TransitionComponent={Slide} open={createProductDetail} maxWidth='xs' PaperProps={{className:'col-12'}}>
    <CreateProductDetail>
        <section className="d-flex bg-primary justify-content-between p-2 sticky-top text-white align-items-center">
        <div>Add new product detail</div>
        <IconButton onClick={()=>setCreateProductDetail(false)}><Close/></IconButton>
        </section>
        <div className="text-center fw-bold fs-6 mt-4">Add new product</div>
      </CreateProductDetail>
      </Dialog>
      {/*  */}
      <Dialog open={prediction} maxWidth='sm' PaperProps={{className:'col-12 h-100 '}} sx={{marginLeft:'15%'}}>
        <ProductCostPrediction>
      <section className="sticky-top text-white align-items-center ">
        <IconButton onClick={()=>setPrediction(false)} className="float-end"><Close/></IconButton>
        </section>
        <div className="text-center"><TypingAnimation text="Heealth cost prediction" speed={40}/></div>
         </ProductCostPrediction>
      </Dialog>
  </div>

    {show==0&&<ProductSummary search={search}/>}
    {show==1&&<DisplayProductDetail search={search}/>}
    
    </> 
}