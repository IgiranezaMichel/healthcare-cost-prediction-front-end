import { Close, Delete} from "@mui/icons-material"
import { Card, Chip, Dialog, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { IPage } from "../../../../interface/page"
import { ProductDao } from "../../../../controller/product"
import { IState } from "../../../../interface/state"
import { ProductContext } from "../../../../context/product"
import { DeleteProduct } from "./delete"
import { useAuthenticationContext } from "../../../../auth"
import { Role } from "../../../../enum/role"
const column=[
    '#', 'Name','Category','Action'
 ]
export const ProductSummary=(prop:{search:string})=>{
  const [page]=useState<IPage>({pageNumber:0,pageSize:10,search:prop.search});
  const [isloading,setIsLoading]=useState(true);
  const [refresh,setRefresh]=useState(false);
  const [productList,setProductList]=useState<any>([]);
  const [product,setProduct]=useState({id:'',name:'',category:'',open:false});
  const authData=useAuthenticationContext();
  useEffect(
    ()=>{
      new ProductDao().displayProduct(page).then(data=>{console.log(data.data)
      ;setProductList(data.data);setIsLoading(false)});
    },[prop.search]
  )
  const data:IState={
    data:productList,refresh:()=>setRefresh(!refresh),setData:(data)=>setProductList(data)
  }
    return <ProductContext.Provider value={data}>
    <div className="fw-bold  mt-3 mb-2 small">Product summary Table</div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '43dvh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
               {column.map(data=><TableCell >
                 {data}
                </TableCell>) }
            </TableRow>
          </TableHead>
          <TableBody>
                  {!isloading&&productList!=undefined&&productList.content.length!=0&&productList.content.map((data:any,index:number)=><TableRow key={index} hover role="checkbox" tabIndex={-1} >
                        <TableCell>{index+1}</TableCell>
                        <TableCell >{data.name}</TableCell>
                        <TableCell >{data.category}</TableCell>
                        <TableCell >
                        {authData.data.role==Role.ROLE_INDUSTRY?
                        <section className="d-flex">
                          <IconButton onClick={()=>setProduct({id:data.id,name:data.name,category:data.category,open:true})}><Delete className='small'/> </IconButton>   
                           </section>
                            :<div className="fs-1 fw-bolder">--</div>
                            } 
                        </TableCell>
                  </TableRow>)}
             {!isloading&&productList!=undefined&&productList.content.length==0&& <TableRow>
                <TableCell colSpan={4} className="text-center">
                    <Chip label='No data found'/></TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
       <Card className="p-2 float-end">
        <Pagination/>
       </Card>
    </Paper>
    <Dialog open={product.open}>
      <DeleteProduct productId={product.id}>
            <section className="d-flex align-items-center justify-content-between p-2">
              <div>Delete product</div> <IconButton onClick={()=>setProduct({...product,open:false})}><Close/></IconButton>
            </section>
            <section className="p-2 fw-bold text-center">Delete Product</section>
            <div className="p-1">Are you sure you want to delete <b>{product.name}</b> ?</div>
      </DeleteProduct>
    </Dialog>
    </ProductContext.Provider>
}