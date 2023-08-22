import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationShow: (state, action) => {
            return action.payload
        }
    }
})

export const { notificationShow } = notificationSlice.actions

export default notificationSlice.reducer