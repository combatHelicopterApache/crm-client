import {createSlice} from '@reduxjs/toolkit'

const GroupModalSlice = createSlice({
    name : "GroupModal",
    initialState: {
        data: null,
        isOpen: false
    },
    reducers: {
        viewGroup: (state,action  ) => {
            state.isOpen = !state.isOpen
            state.data = action.payload
        },
    }
})

export const { viewGroup } = GroupModalSlice.actions;


export default GroupModalSlice.reducer;