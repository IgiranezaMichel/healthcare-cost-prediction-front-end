import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../util/navigation/adminMenu"
import { DisplayProduct } from "../../component/product/displayProduct"

export const AdminProductManagement=()=>{
    return<Navigation navItems={AdminMenu}>
        <div></div>
        <DisplayProduct/>
    </Navigation>
}