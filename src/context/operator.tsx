import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { OperatorDao } from "../controller/operator";

export const OperatorContext=createContext<IState|undefined>(undefined);
export const useOperatorContext=()=>{
    const operator=useContext(OperatorContext);
    if(!operator)throw new Error('Operator is undefined')
    return operator;
}
export const OperatorProvider=(prop:{children:ReactNode})=>{
    const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:''});
    const [refresh,setRefresh]=useState(true);
    const [userList,setuserList]=useState<any>([]);
    useEffect(
      ()=>{
        new OperatorDao().displayOperator(page)
        .then(data=>{setuserList(data.data)});
      },[page.search,refresh]
    )
    const data:IState={
        data:userList,refresh:()=>setRefresh(!refresh),setData:(data:IPage)=>setPage(data)
    }
    return <OperatorContext.Provider value={data}>
    {prop.children}
    </OperatorContext.Provider>
}