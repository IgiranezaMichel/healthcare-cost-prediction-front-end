import { useEffect } from "react"
import { Navigation } from "../../component/navigation"
import { ProductDao } from "../../controller/product"
import { MohMenu } from "../../util/navigation/mohMenu"
import { ProductSummary } from "../component/product/crud/productSummary"
import ProductPriceStatistic from "../../component/productPriceChart"
export const Moh=()=>{
    const productStatistic=new ProductDao().getAllProductPriceStatistics();
    useEffect(
        ()=>{
        productStatistic.then(data=>{
            const arrayData=data.data;
            
            let groupedData = arrayData.reduce((acc:any, item:any) => {
                // Find the group corresponding to the current item's manufactureYear
                let group = acc.find((g:any) => g[0].manufactureYear === item.manufactureYear);
                if (group) {
                  // If the group exists, add the item to it
                  group.push(item);
                } else {
                  // If the group does not exist, create a new group with the item
                  acc.push([item]);
                }
                return acc;
              }, []);
              console.log(groupedData);
            }
        )
        },[]
    )
    return <Navigation navItems={MohMenu}>
        <div className="fw-bolder fs-5">Dashboard</div>
        <div className="row col-12 m-auto ">
            <div className="card col-sm-12 ">
            <small>Product price variation</small>
                <ProductPriceStatistic/>
            </div>
            <div className="p-0 m-0 border mt-2">
 
      <ProductSummary search=""/>
      
 </div>
        </div>
    </Navigation>
}