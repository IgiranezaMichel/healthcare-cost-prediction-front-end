import axios from "axios";
import { IPage } from "../interface/page";
import { IProductDetail } from "../interface/productDetail";
import { IPredict } from "../interface/predict";

const API='http://localhost:8080/api/productDetail';
export class ProductDetailDao{
public createProduct=async(product:IProductDetail)=>{
return await axios.post(API+'/create',product,{withCredentials:true,});
}
public displayProduct=async(page:IPage)=>{
    return await axios.get(API+'/all?search='+page.search+'&pageNumber='+page.pageNumber+'&pageSize='+page.pageSize,{withCredentials:true});
}

public deleteProduct=async(productId:string)=>{
        return await axios.delete(API+'/delete?productDetail='+productId,{withCredentials:true});
}
public predictProductPrice=async(prediction: IPredict)=> {
    return await axios.get('http://localhost:8080/api/predict/product?productId='+prediction.productId+'&fromDate='+prediction.fromDate+'&toDate='+prediction.toDate+'&futureDate='+prediction.futureDate,{withCredentials:true});
}
}