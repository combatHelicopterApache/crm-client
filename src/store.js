import { configureStore } from '@reduxjs/toolkit'
import MenuSlice from './store/menu/menu.slice'
import GroupModalSlice from './store/groups/groups.slice'
import authReducer from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        MenuToggle : MenuSlice,
        GroupModal: GroupModalSlice,
        auth: authReducer
    }
})


export default store