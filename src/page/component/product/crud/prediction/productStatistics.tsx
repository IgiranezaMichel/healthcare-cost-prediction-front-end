import { useEffect, useState } from "react";
import { ProductDao } from "../../../../../controller/product"
import { PIE_CHART_DEFAULT } from "../../../../../component/Barchat";

export const ProductPriceStatistics=(prop:{productId:string,predictionResult:any})=>{
    const productStatistics=new ProductDao().productStatistics(prop.productId);
    const findProductDetail=new ProductDao().findProductById(prop.productId);
    const [isLoading,setIsLoading]=useState(true);
    const [productDetail,setProductDetal]=useState<any>({});
    const [year,setYear]=useState([]);
    const [priceResult,setPriceResult]=useState([]);
    useEffect(
        ()=>{
            productStatistics.then(
                data=>{                   
                    setPriceResult(Array.from(data.data.map((data:any)=>data[0])));
                    setYear(Array.from(data.data.map((data:any)=>data[1])));
                    setIsLoading(false);
 
            }).catch(err=>console.log(err))
            findProductDetail.then(data=>{setProductDetal(data.data);
            console.log(data.data);
            })
        },[prop.productId]
    )
    return <>
    {}
    {!isLoading&&priceResult.length!=0&&year.length!=0&&<>
        <PIE_CHART_DEFAULT data={priceResult} label={year}/>
        <div className="mx-3">
        <div className="mb-3"><b>Product Name</b>:{productDetail.name}</div>
        <div className="mb-3"><b>Product Category</b>:{productDetail.category}</div>
        <div className="mb-3"><b>Prediction Result</b>:{prop.predictionResult.predictionResult}</div>
        <div className="mb-3"><b>Prediction From Date</b>:{prop.predictionResult.fromDate}</div>
        <div className="mb-3"><b>Prediction to date</b>:{prop.predictionResult.predictionResult.toDate}</div>
            
        </div>
    </>
    }
    
    </>
}