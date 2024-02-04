import { NotificationType } from "../contexts/NotificationContext";

interface NotificationProps {
  message: string;
  type: NotificationType;
  hideNotification: () => void;
}
export default function Notification({ message, type, hideNotification }: NotificationProps) {
  let color: string;

  if (type === "success") {
    color = "green";
  } else if (type === "error") {
    color = "red";
  } else {
    color = "blue";
  }

  const notificationClasses = `bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative text-center`;
  const iconColor = color;

  return (
    <div className={notificationClasses} role="alert">
      <strong className="mr-2 block font-bold sm:inline-block">
        {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'}
      </strong>
      <span className="block sm:inline-block ">{message}</span>
      <span
        className={`absolute inset-y-0 right-0 px-2 py-3 text-${iconColor}-500`}
        onClick={hideNotification}
      >
        <svg
          className="size-6 fill-current"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
}
