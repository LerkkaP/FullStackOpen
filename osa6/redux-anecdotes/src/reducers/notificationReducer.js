import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },
        clearNotification: () => {
            return ''
        }
    }
})

export const setNotificationWithTimeout = (message, duration) => {
    return async dispatch => {
      dispatch(setNotification(message))
  
      await new Promise(resolve => setTimeout(resolve, duration * 1000))
  
      dispatch(clearNotification())
    }
  }

export const { setNotification, clearNotification  } = notificationSlice.actions
export default notificationSlice.reducer

