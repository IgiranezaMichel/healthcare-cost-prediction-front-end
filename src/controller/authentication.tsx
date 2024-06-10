
import axios from "axios";
const API='http://localhost:8080';
export class AuthenticationDao{
public checkSession=async()=>{
return await axios.post(API+'/login-success',{},{withCredentials:true});
}
public logout=async()=>{
    return await axios.post(API+'/logout',{},{withCredentials:true});
    }
}