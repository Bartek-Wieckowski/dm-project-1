// FIXME: DO OMÓWIENIA import menuData from "../assets/dummy-data/menu-data";
import { Link } from "react-router-dom";
import {
  BsFillPeopleFill,
  BsFillBagCheckFill,
  BsFillFileEarmarkRuledFill,
  BsFillHddRackFill,
  BsAmd,
} from "react-icons/bs";
import { MenuItem } from "../types/MenuItem.type";

const menuData: MenuItem[] = [
  {
    linkName: "Clients",
    link: "/clients",
    icon: <BsFillPeopleFill />,
  },
  {
    linkName: "Orders",
    link: "/orders",
    icon: <BsFillBagCheckFill />,
  },
  {
    linkName: "Facture",
    link: "/invoices",
    icon: <BsFillFileEarmarkRuledFill />,
  },
  {
    linkName: "Posts",
    link: "/posts",
    icon: <BsFillHddRackFill />,
  },
];

export default function AsideMenu() {
  return (
    <aside className="size-full bg-slate-400">
      <div className="my-4 mx-auto">
        <BsAmd className="block w-full" />
      </div>
      <ul className="p-2 flex flex-col gap-4">
        {menuData.map((menuItem) => (
          <li key={menuItem.linkName}>
            <Link to={menuItem.link} className="hover:text-stone-200 transition-all">
              <div className="grid grid-cols-[16px_1fr] items-center gap-1">
                {menuItem.icon}
                <p>{menuItem.linkName}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
