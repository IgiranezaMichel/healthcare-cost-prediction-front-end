import { DashboardOutlined, PeopleAlt, ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import { IMenu } from "../../interface/menu";

export const AdminMenu:IMenu[]=[
    {name:'dashboard',
     link:'/admin',
     icon:<DashboardOutlined/>
    },
    {name:'Manage user',
        link:'/admin/user',
        icon:<PeopleAlt/>
       },
       {name:'Manage Product',
        link:'/admin/product',
        icon:<ProductionQuantityLimitsTwoTone/>
       } 
]