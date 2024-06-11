import BasicLineChart from "../../component/lineChart"
import { Navigation } from "../../component/navigation"
import ProductPriceStatistic from "../../component/productPriceChart"
import { OperatorProvider } from "../../context/operator"
import { AdminMenu } from "../../util/navigation/adminMenu"
import { DisplayUserTable } from "./user/crud/userDetailTable"

export const Admin=()=>{
    return <Navigation navItems={AdminMenu}>
     
        <div className="fs-5 fw-bold">
            Dashboard
        </div>
        <section className="card p-2">
        <div className="row col-12 m-auto ">
            <div className="card col-sm-6 ">
                <ProductPriceStatistic/>
            </div>
            <div className="card col-sm-6">
            <small>Rate of user registration</small>
                <BasicLineChart/>
            </div>
            <OperatorProvider>
            <div className="p-0 m-0 border mt-2">
                <DisplayUserTable/>
            </div>
            </OperatorProvider>
        </div>
        </section>
      
    </Navigation>
}