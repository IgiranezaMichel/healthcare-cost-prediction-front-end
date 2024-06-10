import { createContext, useContext } from "react";
import { IState } from "../interface/state";

export const ProductContext=createContext<IState|undefined>(undefined);
export const useProductContext=()=>{
    const product=useContext(ProductContext);
    if(product==undefined)throw new Error('Product not in context');
    return product;
}