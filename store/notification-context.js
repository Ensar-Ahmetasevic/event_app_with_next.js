import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
        // clear "timer" if "useEffect" re-runs before the timer went off, so that we don't have multiple ongoing timers at the same time.
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    // setActiveNotification({
    //     title: notificationData.title,
    //     message: notificationData.message,
    //     status: notificationData.status
    // })

    // Since these objects are exactly equal (setActiveNotification === notificationData), we can take a shortcut
    // and just "setActiveNotification" to that "notificationData" we're getting here "setActiveNotification(notificationData)".

    setActiveNotification(notificationData);
  }

  function hideNotificationHandndler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandndler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
