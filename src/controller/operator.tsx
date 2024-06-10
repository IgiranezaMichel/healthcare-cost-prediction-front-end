import axios from "axios";
import { IOperator } from "../interface/operator";
import { IPage } from "../interface/page";
import { Role } from "../enum/role";
const API='http://localhost:8080/api/operator';
export class OperatorDao{
 createOperator=async(operator:IOperator,password:string)=>{
    return await axios.post(API+'/create?password='+password,operator,{withCredentials:true});
    }
    public displayOperator=async(page:IPage)=>{
        return await axios.get(API+'/all?search='+page.search+'&pageNumber='+page.pageNumber+'&pageSize='+page.pageSize,{withCredentials:true});
    }
    
    public deleteOperator=async(operatorId:string)=>{
            return await axios.delete(API+'/delete?operatorId='+operatorId,{withCredentials:true});
    }
    public changeOperatorRole=async(operatorId:string,role:Role)=>{
        return await axios.post(API+"/change/role?operatorId="+operatorId+"&role="+role,{},{withCredentials:true});
    }
    public getAllOperator=async()=>{
        return await axios.get(API+"/get/all",{withCredentials:true});
    }
    }