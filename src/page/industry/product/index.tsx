import { Navigation } from "../../../component/navigation"
import { IndustryRepMenu } from "../../../util/navigation/industryMenu"
import { DisplayProduct } from "../../component/product/displayProduct"

export const IndustryProduct=()=>{
    return <Navigation navItems={IndustryRepMenu}>
        <div>
            <DisplayProduct/>
        </div>
    </Navigation>
}