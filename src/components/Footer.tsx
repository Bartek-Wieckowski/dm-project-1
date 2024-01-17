import { Link } from "react-router-dom";
import { FooterProps } from "../types/FooterProps.type";

export default function Footer({ footerData }: FooterProps) {
  return (
    <footer className="w-full bg-slate-800 text-stone-200 py-4">
      <div className="grid grid-cols-1">
        <ul>
          {Object.entries(footerData).map(([key, value]) => (
            <li key={key}>
              <Link to={value}>{key}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
