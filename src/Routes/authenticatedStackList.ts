import Home from '@Screen/Home';
import Pickup from '@Screen/Pickup';
import Dropoff from '@Screen/Dropoff';

export const screenList: Array<Object> = [
    {
        name: "Root",
        component: Home,
        title: "Home"
    },
    {
        name: "Pickup",
        component: Pickup,
        title: "Pickup Location"
    },
    {
        name: "Drop-off",
        component: Dropoff,
        title: "Drop-off Location"
    }
]


