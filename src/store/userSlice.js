import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    user: null,
    loader: false,
    order: [],
    shop: {},
    products: [],
    deliver:[],
    subscriptions: []
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("🟢 User data received in Redux:", action.payload); // Check API data
        
            // Save token to localStorage
            localStorage.setItem("token", action.payload.token);
        
            state.user = { 
                ...action.payload, 
                role: action.payload.role === "admin" ? "admin" : "Vendor"
            };
        
            console.log("🟢 Updated user in Redux:", state.user); // Check updated Redux state
            console.log("🟢 Checking Token from Redux:", state.user?.token);
            console.log("🟢 Checking Token from Local Storage:", localStorage.getItem("token"));
        },
        

        setLoader: (state, action) => {
            state.loader =  action.payload
        },
        setShop: (state, action) => {
            state.shop = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setDeliver: (state, action) => {
            state.deliver =action.payload
        },
        setSubscriptions: (state, action) => {
            state.subscriptions = action.payload
        },
        logoutUser: (state, action) => {
            state.user = null,
            state.subscriptions = [],
            state.products = [],
            state.shop = {}
        }
    }
})

export const { setUser, setLoader, setShop, setProducts  ,setDeliver, setSubscriptions, logoutUser } =
  userSlice.actions;
export default userSlice.reducer;