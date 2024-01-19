import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getUserCartItemsAPI } from "../api/itemApi";
import MaterialSymbolsHomeOutlineRounded from "../assets/MaterialSymbolsHomeOutlineRounded";
import MaterialSymbolsShoppingBagOutlineSharp from "../assets/MaterialSymbolsShoppingBagOutlineSharp";
import MaterialSymbolsShoppingCartOutlineRounded from "../assets/MaterialSymbolsShoppingCartOutlineRounded";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar(props) {

  const [itemCount, setItemCount] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClick = () => {
    navigate("/cart");
  };

  const navigation = [
    { name: "Home", href: "/home", icon: <MaterialSymbolsHomeOutlineRounded/> },
    { name: "My orders", href: "/myorders", icon: <MaterialSymbolsShoppingBagOutlineSharp/>},
  ];

  const cartItems = async () => {
    const res = await getUserCartItemsAPI();
    setItemCount(res.data.data?.length);
  }

  useEffect(() => {
     if(props?.count) {
       setItemCount(props.count);
     } else {
       cartItems();
     }
  })
  
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-lg z-20"
      style={{ fontFamily: "Inter", position: "fixed", top: 0, width: "100%" }}
    >
      {({ open }) => (
        <>
          <div
            className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
            style={{ fontFamily: "Inter" }}
          >
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md  text-gray-400">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  className="flex flex-shrink-0 items-center ml-2 sm:ml-2"
                  style={{ gap: 10 }}
                >
                  <a href = "/home">
                  <Logo style ={{cursor: "pointer"}}></Logo>
                  </a>
                  <h1
                  className="font-semibold"
                    style={{
                      fontFamily: "Inter",
                      color: "orange",
                      fontSize: "1.5rem",
                    }}
                  >
                    Hunger Food
                  </h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div
                    className="flex space-x-4"
                    style={{ fontFamily: "Inter", cursor: "pointer" }}
                  >
                    {navigation.map((item, index) => (
                    
                      <a
                       style={{cursor: "pointer"}}
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          props.current === item.name
                            ? "bg-slate-200 text-black"
                            : "text-black",
                          "flex gap-2 rounded-full px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <span className="mt-1">{item.icon}</span>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
                style={{ gap: 30 }}
              >
                <div style={{ marginTop: "0.4rem" }}>
                  {/* <FontAwesomeIcon
                    icon={faCartShopping}
                    size="xl"
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={handleClick}
                  /> */}
                  <MaterialSymbolsShoppingCartOutlineRounded style = {{cursor:"pointer"}} color = {"black"} size = {"1.75rem"} onClick = {handleClick}/>
                  {(props.count > 0 || itemCount > 0) && (
                    <span
                      className="count"
                      style={{ marginTop: "0.6rem", cursor: "pointer" }}
                    >
                      {itemCount}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    className="bg-orange-600 hover:bg-orange-400 hover:text-white text-white font-medium py-2 px-4 rounded-3xl"
                    style={{
                      fontFamily: "Inter",
                      position: "inherit",
                    }}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div
              className="space-y-1 px-2 pb-3 pt-2"
              style={{ fontFamily: "Inter" }}
            >
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-black"
                      : "text-black hover:bg-gray-700 hover:text-white",
                    "flex gap-2 rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <span className="mt-1">{item.icon}</span>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
