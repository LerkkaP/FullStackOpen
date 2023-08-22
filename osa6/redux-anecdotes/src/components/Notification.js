import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [dispatch, notification])

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
