import { Link, useLocation } from "react-router-dom"
import { FaUsers } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import style from "./Navigation.module.css"
import React, { useEffect } from "react";
export default function Navigation({ children }: any) {
  const { pathname } = useLocation();
  const ListMenu = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: <FaUsers />,
      name: "User Mangement",
      path: "/usermangement"
    },
    {
      icon: <RiAdminFill />,
      name: "User Access",
      path: "/userrole"
    },
  ]
  useEffect(() => {
    const menuItems = document.querySelectorAll(".menuItems");
    menuItems.forEach((element) => {
      const path = element.children[0].getAttribute("href");
      if (path === location.pathname) {
        element.classList.remove(style.menuItem);
        element.classList.add(style.menuActive);
      }
    });
  }, [pathname]);
  return (
    <div className={style.content}>
      <nav className={style.menu}>
        <ul className={style.menuList}>
          {ListMenu.map((item, index) => (
            <React.Fragment key={index}>
              <li key={index} className={`${style.menuItem} menuItems`}>
                <Link to={item.path}> <span className={style.icon}>{item.icon}</span>  {item.name}</Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  )
}