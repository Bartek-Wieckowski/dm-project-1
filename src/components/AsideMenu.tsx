// FIXME: DO OMÓWIENIA import menuData from "../assets/dummy-data/menu-data";
import { Link } from 'react-router-dom';
import {
  BsFillPeopleFill,
  BsFillBagCheckFill,
  BsFillFileEarmarkRuledFill,
  BsFillHddRackFill,
  BsTextWrap,
  BsAmd,
  BsListColumns,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { MenuItem } from '../types/MenuItem.type';
import { useState } from 'react';

const menuData: MenuItem[] = [
  {
    linkName: 'Clients',
    link: '/clients',
    icon: <BsFillPeopleFill />,
  },
  {
    linkName: 'Orders',
    link: '/orders',
    icon: <BsFillBagCheckFill />,
  },
  {
    linkName: 'Facture',
    link: '/invoices',
    icon: <BsFillFileEarmarkRuledFill />,
  },
  {
    linkName: 'Comments',
    link: '/comments',
    icon: <BsTextWrap />,
  },
  {
    linkName: 'Posts',
    link: '/posts',
    icon: <BsFillHddRackFill />,
  },
];

export default function AsideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  function handleClickMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <aside
      className={`row-span-2 size-full bg-slate-400 transition-all ${
        !isOpen ? 'translate-x-[-65px]' : ''
      }`}
    >
      <div className="sticky top-8">
        <div
          className="ml-auto size-[16px] cursor-pointer pr-6"
          onClick={handleClickMenu}
        >
          {!isOpen && <BsListColumns />}
          {isOpen && <BsThreeDotsVertical />}
        </div>
        <div
          className={`${isOpen ? 'mx-auto' : 'ml-auto mr-2 size-[16px]'} my-4`}
        >
          <BsAmd className="block w-full" />
        </div>
        <ul className="flex flex-col gap-4 p-2">
          {menuData.map((menuItem) => (
            <li key={menuItem.linkName}>
              <Link
                to={menuItem.link}
                className="transition-all hover:text-stone-200"
              >
                <div className="group grid grid-cols-[1fr_16px] items-center gap-1">
                  <p className="group-[:nth-of-type(4)_&]:text-[10px]">
                    {menuItem.linkName}
                  </p>
                  {menuItem.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
