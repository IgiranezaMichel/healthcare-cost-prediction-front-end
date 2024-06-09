import { Navigation } from "../../component/navigation"
import { MohMenu } from "../../util/navigation/mohMenu"
import { DisplayProduct } from "../component/product/displayProduct"

export const MohProductManagement=()=>{
    return <Navigation navItems={MohMenu}>
    <div>
        <DisplayProduct/>
    </div>
    </Navigation>
}