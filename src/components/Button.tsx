import { Link } from "react-router-dom";

interface ButtonPropsType {
  children: React.ReactNode;
  btnStyles: keyof typeof styles;
  disabled?: boolean;
  to?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

export default function Button({ children, btnStyles, disabled, to, type, onClick }: ButtonPropsType) {
  const isDisabledlClasses = disabled && "opacity-50";

  if (to) {
    return (
      <Link to={to} className={styles[btnStyles]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles[btnStyles]} ${isDisabledlClasses}`}
      >
        {children}
      </button>
    );
  }
  return (
    <button type={type} disabled={disabled} className={`${styles[btnStyles]} ${isDisabledlClasses}`}>
      {children}
    </button>
  );
}

const commonButtonClasses = "my-2 me-2 rounded-lg px-5 py-2.5 text-sm font-medium focus:outline-none";

const styles = {
  btnAdd:
    commonButtonClasses +
    " bg-purple-700 text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
  btnEdit:
    commonButtonClasses +
    " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  btnUpdate:
    commonButtonClasses +
    " bg-green-700 text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
  btnCancel:
    commonButtonClasses +
    " border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700",
  btnDelete:
    commonButtonClasses +
    "  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
  btnQty:
    "inline-block rounded-full bg-yellow-400 px-2.5 py-1 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-3.5 md:py-2",
  btnSimple: "rounded-md bg-teal-400 p-4 text-black",
  //   link?:
};
