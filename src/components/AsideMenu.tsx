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
  BsCart,
  BsFillSunFill,
  BsMoonFill,
} from 'react-icons/bs';
import { MenuItem } from '../types/MenuItem.type';
import { useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAppSelector } from '../redux/hooks/hooks';

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
  {
    linkName: 'Cart',
    link: '/cart',
    icon: <BsCart />,
  },
  {
    linkName: 'Orders Cart',
    link: '/orders/cart',
    icon: <BsCart />,
    badge: true,
  },
];

export default function AsideMenu() {
  const ordersState = useAppSelector((state) => state.order.orders);
  const [isOpen, setIsOpen] = useState(true);
  const { toggleDarkMode, isDarkMode } = useDarkMode();
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
          className="mb-5 ml-auto size-[16px] cursor-pointer pr-6"
          onClick={toggleDarkMode}
        >
          {!isDarkMode && <BsMoonFill />}
          {isDarkMode && <BsFillSunFill />}
        </div>
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
          <Link to="/">
            <BsAmd className="block w-full cursor-pointer" />
          </Link>
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

                  {menuItem.badge ? (
                    <div className="relative">
                      <div className="absolute -end-2 -top-2 inline-flex size-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[8px] font-bold text-white dark:border-gray-900">
                        {ordersState.length}
                      </div>
                      {menuItem.icon}
                    </div>
                  ) : (
                    menuItem.icon
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
