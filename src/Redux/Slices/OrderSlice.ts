import { createSlice } from "@reduxjs/toolkit"


const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orderIdTocancle: "",
        orders: [],
        menuStatus: false,
        orderId: ""
    },
    reducers: {
        cancelOrder: (state, action) => {
            state.orders.splice(action.payload, 1)
        },
        getOrders: (state, actions) => {
            state.orders = actions.payload
        },
        toogleMenu: (state, action) => {
            state.menuStatus = action.payload
        },
        getOrderId: (state, action) => {
            state.orderId = action.payload
        }
    }
})
export const { cancelOrder, getOrders, toogleMenu, getOrderId } = OrderSlice.actions
export default OrderSlice.reducer