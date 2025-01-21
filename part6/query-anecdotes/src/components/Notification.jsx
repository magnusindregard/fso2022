import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const displayState = notification.visible ? "block" : "none"
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: displayState
  }
  return (
    <div style={style}>
      {notification.content}
    </div>
  )
}

export default Notification