import axios from "axios";
import { IProduct } from "../interface/product";
import { IPage } from "../interface/page";

const API='http://localhost:8080/api/product';
export class ProductDao{
public createProduct=async(product:IProduct)=>{
return await axios.post(API+'/create',product,{withCredentials:true,});
}
public displayProduct=async(page:IPage)=>{
    return await axios.get(API+'/all?search='+page.search+'&pageNumber='+page.pageNumber+'&pageSize='+page.pageSize,{withCredentials:true});
}

public deleteProduct=async(productId:string)=>{
        return await axios.delete(API+'/delete?productId='+productId,{withCredentials:true});
}
public findProductById=async(productId:string)=>{
    return await axios.get(API+'?productId='+productId,{withCredentials:true});
}
public productStatistics=async(productId:string)=>{
    return await axios.get(API+'/statistics?productId='+productId,{withCredentials:true});
}
public getAllProduct=async()=>{
    return await axios.get(API+"/get/all",{withCredentials:true});
}
public getAllProductPriceStatistics=async()=>{
    return await axios.get(API+"/statistic/all",{withCredentials:true});
}
}