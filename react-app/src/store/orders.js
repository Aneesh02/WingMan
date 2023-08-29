

//ACTION TYPES
export const LOAD_PAST_ORDERS = "orders/getPastOrders"
export const CREATE_ORDER = "orders/createOrder"

//ACTION CREATORS
export const getPastOrders = (orders) => {
    return {
        type: LOAD_PAST_ORDERS,
        orders
    }
}

export const createOrder = (order) => {
    return {
        type: CREATE_ORDER,
        order
    }
}

//THUNKS
export const thunkGetPastOrders = (id) => async (dispatch) => {
    const res = await fetch(`/api/orders/${id}`, {
        method: "GET"
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(getPastOrders(data.past_orders))
        return data
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkCreateOrder = (order) => async (dispatch) => {
    const restaurantId = order.menuItems[0].name
    const res = await fetch("/api/orders/new", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            menu_items: order.menuItems,
            total_cost: order.totalCost,
            restaurant_id: restaurantId,
        })
    })
}

//REDUCER
const initialState = { pastOrders: [], shoppingCart: [] }

export const ordersReducer = (state = initialState, action) => {
    // let newState;
    switch (action.type) {
        case LOAD_PAST_ORDERS: {
            // console.log("*** in LOAD_PAST_ORDERS action ***", action)
            const newState = { ...state, pastOrders: [], shoppingCart: [...state.shoppingCart] }
            newState.pastOrders = action.orders
            return newState
        }
        case CREATE_ORDER: {
            const newState = { ...state, pastOrders: [ ...state.pastOrders ], shoppingCart: [] }
            newState.pastOrders.push(action.order)
            return newState
        }
        default:
            return state;
    }
}
