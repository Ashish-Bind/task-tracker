function showNotification(title, options) {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(title, options)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, options)
        }
      })
    }
  }
}

export default function scheduleTaskNotification(task) {
  setTimeout(() => {
    showNotification(`Task Reminder`, {
      body: `Don't forget to complete the task: ${task}`,
    })
  }, 30000) // 5 minutes in milliseconds
}
