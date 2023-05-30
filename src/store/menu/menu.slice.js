import {createSlice} from '@reduxjs/toolkit'

const MenuSlice = createSlice({
    name : "MenuToggle",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleMenu } = MenuSlice.actions;

export default MenuSlice.reducer;