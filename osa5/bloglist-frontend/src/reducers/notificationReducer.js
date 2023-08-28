const notificationRedcuer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload.content
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const setNotification = (content) => {
  return {
    type: 'SHOW',
    payload: {
      content
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationRedcuer
