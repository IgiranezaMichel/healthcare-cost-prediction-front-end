import { Approval, Delete, Edit } from "@mui/icons-material"
import {  Card, Chip, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react";
import { ProductDetailDao } from "../../../../controller/productDetail";
import { IPage } from "../../../../interface/page";
import { IState } from "../../../../interface/state";
import { ProductContext } from "../../../../context/product";
import { useAuthenticationContext } from "../../../../auth";
const column=[
   '#', 'Name','Category','Manufacturer','Manufacture date','Country','Quantity','Price','Quality','Action'
]
export const DisplayProductDetail=(prop:{search:string})=>{
  const [page]=useState<IPage>({pageNumber:0,pageSize:10,search:prop.search});
  const [isloading,setIsLoading]=useState(true);
  const [refresh,setRefresh]=useState(false);
  const [productList,setProductList]=useState<any>([]);
  const authData=useAuthenticationContext();
  useEffect(
    ()=>{
      new ProductDetailDao().displayProduct(page).then(data=>{setProductList(data.data);setIsLoading(false)});
    },[prop.search]
  )

  const data:IState={
    data:productList,refresh:()=>setRefresh(!refresh),setData:(data)=>setProductList(data)
  }
    return<ProductContext.Provider value={data}>
    <div className="fw-bold  mt-3 mb-2">Product detail Table</div>
     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '50dvh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
               {column.map(data=><TableCell >
                 {data}
                </TableCell>) }
            </TableRow>
          </TableHead>
          <TableBody>
          {!isloading&&productList!=undefined&&productList.content.length!=0&&productList.content.map((data:any,index:number)=><TableRow hover role="checkbox" tabIndex={-1} >
                        <TableCell>
                           {index+1}  
                        </TableCell>
                        <TableCell >{data.productName}   </TableCell>
                        <TableCell >{data.productCategory}    </TableCell>
                        <TableCell >{data.manufacturer}    </TableCell>
                        <TableCell >{data.manufactureDate}    </TableCell>
                        <TableCell >{data.country}    </TableCell>
                        <TableCell >{data.quantity} {data.unit}</TableCell>
                        <TableCell >{data.price} {data.currency}</TableCell>
                        <TableCell >{data.quality==null?<>not set</>:<>{data.quality}</>}    </TableCell>
                         <TableCell >
                          {authData.data.role=='ROLE_INDUSTRY'?<div className="d-flex">
                          <IconButton><Delete className='small'/> </IconButton>   
                          <IconButton><Edit className='small'/> </IconButton>   
                          <IconButton><Approval className='small'/> </IconButton> 
                            </div>:<div className="fw-bolder fs-2">--</div> }

                            </TableCell>
                  </TableRow>)}
                  {!isloading&&productList!=undefined&&productList.content.length==0&& <TableRow>
                <TableCell colSpan={12} className="text-center">
                    <Chip label='No data found'/></TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
       <Card className="p-2 float-end">
        <Pagination/>
       </Card>
    </Paper>
    </ProductContext.Provider> 
}