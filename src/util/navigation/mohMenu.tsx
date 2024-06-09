import { DashboardOutlined, ProductionQuantityLimits } from "@mui/icons-material";
import { IMenu } from "../../interface/menu";

export const MohMenu:IMenu[]=[
    {name:'dashboard',
     link:'/moh',
     icon:<DashboardOutlined/>
    },
    {name:'product',
        link:'/moh/product',
        icon:<ProductionQuantityLimits/>
       }
    //    {name:'Prediction History',
    //     link:'/moh/prediction',
    //     icon:<PriceChangeOutlined/>
    //    }
]