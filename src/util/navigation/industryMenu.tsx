import { DashboardOutlined, ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import { IMenu } from "../../interface/menu";

export const IndustryRepMenu:IMenu[]=[
    {name:'dashboard',
     link:'/industry',
     icon:<DashboardOutlined/>
    },
    {name:'product',
        link:'/industry/product',
        icon:<ProductionQuantityLimitsTwoTone/>
       } 
]