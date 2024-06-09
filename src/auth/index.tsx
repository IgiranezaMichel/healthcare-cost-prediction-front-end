import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { AuthenticationDao } from "../controller/authentication";
import { useNavigate } from "react-router-dom";
import { Role } from "../enum/role";

export const AuthenticationContext=createContext<IState|undefined>(undefined);
export const useAuthenticationContext=()=>{
    const Authentication=useContext(AuthenticationContext);
    if(!Authentication)throw new Error('Authentication is undefined')
    return Authentication;
}
export const AuthenticationProvider=(prop:{children:ReactNode})=>{
    const navigation=useNavigate();
    const [refresh,setRefresh]=useState(true);
    const [user,setUser]=useState<any>([]);
    const [isAuthorized,setIsAuthorized]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    useEffect(
      ()=>{
        new AuthenticationDao().checkSession()
        .then(data=>{
            const responseData=data.request.responseURL as string;
            if(responseData!='http://localhost:8080/login-success'){
                setIsAuthorized(false);
                setIsLoading(false);
                navigation("/login",{state:{error:"You're not authorized to access "+location.pathname+" path"}})
            }
            else if(responseData=='http://localhost:8080/login-success'){
                setUser(data.data);
                setIsAuthorized(true);
                setIsLoading(false);
                data.data.role==Role.ROLE_ADMIN?navigation("/admin"):data.data.role==Role.ROLE_INDUSTRY?
                navigation("/industry"):data.data.role==Role.ROLE_MOH?navigation("/moh"):
                navigation("/login",{state:{success:data.data.name+" you've logged in successful but admin need to give access to this pager"}})
            }
        })
        .catch(err=>{navigation("/login",{state:{error:"Session has expired"+err.request.response}})});
      },[refresh,isAuthorized]
    )
    const data:IState={
        data:user,refresh:()=>setRefresh(!refresh),setData:(data)=>setUser(data)
    }
    return <>
    {!isLoading&&isAuthorized&&<AuthenticationContext.Provider value={data}>
    {prop.children}
    </AuthenticationContext.Provider>}
    </>
}