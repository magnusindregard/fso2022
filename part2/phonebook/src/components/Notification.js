const Notification = ({ message, type }) => {

    const notificationClasses = `notification ${type}`

    if (message === null) {
      return null
    }
  
    return (
      <div className={notificationClasses}>
        {message}
      </div>
    )
  }

export default Notification