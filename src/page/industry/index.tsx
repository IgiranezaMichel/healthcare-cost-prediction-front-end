import { Navigation } from "../../component/navigation"
import ProductPriceStatistic from "../../component/productPriceChart"
import { IndustryRepMenu } from "../../util/navigation/industryMenu"

export const Industry=()=>{
    return <Navigation navItems={IndustryRepMenu}>
        <div>
            <div className="fw-bolder fs-5">
                Dashboard
            </div>
            <div className="card p-2">
            <div className="small">Price level</div>
            <ProductPriceStatistic/>
            </div>
        </div>
    </Navigation>
}