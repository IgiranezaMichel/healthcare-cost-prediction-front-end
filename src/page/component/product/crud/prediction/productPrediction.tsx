import { ReactNode, useEffect, useState } from "react"
import { Button, NativeSelect,TextField } from "@mui/material"
import { ProductDao } from "../../../../../controller/product";
import { ProductDetailDao } from "../../../../../controller/productDetail";
import { IPredict } from "../../../../../interface/predict";
import { ProductPriceStatistics } from "./productStatistics";
export const ProductCostPrediction=(prop:{children:ReactNode})=>{
    const [prediction,setPrediction]=useState<IPredict>({
        productId:'',fromDate:'',toDate:'',futureDate:''
    });
    const [isloading,setIsLoading]=useState(true);
    const [predictionResult,setPredictionResult]=useState<any>({});
    const [waitingPredictionResult,setWaitingPrediction]=useState(false);
    const [productList,setProductList]=useState<any>([]);
    useEffect(
        ()=>{
          new ProductDao().getAllProduct().then(data=>{setProductList(data.data);setIsLoading(false)})
        },[]
      )  
    const predictHandler=async(e:any)=>{
        e.preventDefault();
       const predictionResult= new ProductDetailDao().predictProductPrice(prediction);
       predictionResult.then(data=>{setPredictionResult(data.data);setWaitingPrediction(true)}
       ).catch(err=>console.log(err)
       )
    }
    return <>
    {prop.children}
    {!waitingPredictionResult&&<section className="p-2">
              <>
              <div className="mb-3"><b>Fill the form below to make prediction</b></div>
              <form onSubmit={predictHandler}>
              <div className="col-md-12  d-flex justify-content-between align-items-center h-100">
                <div className="col-md-6 p-1">
                <small>select product</small>
                <NativeSelect required fullWidth onChange={(e)=>setPrediction({...prediction,productId:e.target.value})} className="form-control border border-dark-subtle mb-3">
                  <option value="">select product</option>
                  {!isloading&&productList.length!=0
                  &&productList.map((data:any,index:number)=><option key={index} value={data.id}>{data.name}</option>)}
                </NativeSelect>
                <div className="mb-3">
                  <small>From date</small>
                  <TextField required value={prediction.fromDate} onChange={(e)=>setPrediction({...prediction,fromDate:e.target.value})} sx={{'& .MuiInputBase-root':{height:45}}} type="date" fullWidth/>
                </div>
                </div>
                <div  className="col-md-6 p-1">
                <div className="mb-3">
                  <small>To date</small>
                  <TextField required value={prediction.toDate} onChange={(e)=>setPrediction({...prediction,toDate:e.target.value})} sx={{'& .MuiInputBase-root':{height:45}}} type="date" fullWidth/>
                </div>
                <div className="mb-3">
                  <small>Future date</small>
                  <TextField required value={prediction.futureDate} onChange={(e)=>setPrediction({...prediction,futureDate:e.target.value})} sx={{'& .MuiInputBase-root':{height:45}}} type="date" fullWidth/>
                </div>
                </div>
              </div>
              <div className="modal-footer pe-1">
                <Button variant="contained" type="submit">Predict</Button>
              </div>
              </form>
              </>
      </section>}
      {waitingPredictionResult&&<div>
        <ProductPriceStatistics productId={prediction.productId} predictionResult={predictionResult}>

        </ProductPriceStatistics>
        </div>}
    </>
}