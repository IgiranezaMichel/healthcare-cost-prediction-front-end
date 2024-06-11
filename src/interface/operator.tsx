import { Role } from "../enum/role"

export interface IOperator{
  id?:string
  name:string
  profile:string
  gender:string
  email:string
  role:Role
}