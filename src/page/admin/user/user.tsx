import { Navigation } from "../../../component/navigation"
import { OperatorProvider } from "../../../context/operator"
import { AdminMenu } from "../../../util/navigation/adminMenu"
import { DisplayUserTable } from "./crud/userDetailTable"

export const ManageUser=()=>{
    return <Navigation navItems={AdminMenu}>
        <OperatorProvider>
        <div className="mt-3 fs-5 fw-bold">Manage System users</div>
          <DisplayUserTable />  
        </OperatorProvider>
    </Navigation>
}