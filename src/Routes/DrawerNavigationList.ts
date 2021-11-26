import { AuthenticatedStackNavigation as HomeList } from '@Navigation/AuthenticatedSatckNavigation';
import { OrderStackNavigation as Order } from "@Navigation/OrderStackNavigation"
import Setting from '@Screen/Setting';
import { Icons } from "@Components/Atoms/Icons";
import Language from '@Screen/Language';
import DrawerNavigationLanguage from "@Language/DrawerNavigationLanguage.json"


console.log(DrawerNavigationLanguage[global.language])

export const screenList: Array<Object> = [
    {
        name: "Home",
        component: HomeList,
        title: "Home",
        Icon: Icons
    },
    {
        name: "Order history",
        component: Order,
        title: "Order history",
        Icon: Icons
    },
    {
        name: "Setting",
        component: Setting,
        title: "Setting",
        Icon: Icons
    },
    {
        name: "Language",
        component: Language,
        title: "Language",
        Icon: Icons
    }
]


