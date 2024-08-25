const Notification = ({ message, messageType }) => {
  const messageClass = [
    'notification',
    messageType
  ]

  if (message === null) {
    return null
  }

  return (
    <div className={messageClass.join(' ')}>
      {message}
    </div>
  )
}

export default Notification