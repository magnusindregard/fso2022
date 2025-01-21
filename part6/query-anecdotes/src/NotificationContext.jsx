import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        content: action.payload,
        visible: true
      }
    case "HIDE":
      return {
        content: "",
        visible: false
      }
    default: 
      return defaultNotificationState
  }
}

const defaultNotificationState = {
  content: "Default message",
  visible: false
}

const NotificationContext = createContext()



export const NotificationContextProvider = ( props ) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, defaultNotificationState)
  
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext