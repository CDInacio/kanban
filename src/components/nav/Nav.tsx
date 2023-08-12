"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Avatar from "../Data Display/Avatar";
import TextInput from "../Forms/TextInput";
import Popover from "../Overlay/Popover";
const Nav = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropdown] = useState<boolean>(false);
  const settings = [
    "Profile",
    "Account",
    "Dashboard",
    `${status === "authenticated" ? "Sair" : "Entrar"}`,
  ];

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenUserMenu = () => {
    setDropdown((prev) => !prev);
  };

  const handleSigIn = () => {
    signIn();
  };

  const handleSigOut = () => {
    signOut();
  };

  return (
    <>
      <nav className="bg-white py-[30px] shadow-sm">
        <div className="container flex items-center justify-between mx-auto">
          <div className="relative">
            <Avatar
              onClick={handleOpenUserMenu}
              image={session?.user?.image}
              alt="imagem do usuario"
            />
            {dropDown && (
              <div className="absolute bg-white w-[200px] shadow-sm">
                {settings.map((setting) => (
                  <div className="py-[10px] px-[20px] hover:bg-neutral-100 transition ease-out duration-300 cursor-pointer">
                    <span
                      onClick={setting === "Sair" ? handleSigOut : handleSigIn}
                    >
                      {setting}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <TextInput className="w-[500px]" placeholder="Pesquisar..." />
          <button
            onClick={togglePopover}
            className="flex  items-center text-white bg-neutral-800 hover:bg-neutral-900 transition ease-out duration-300 px-[20px] py-[10px] rounded-md"
          >
            <IoIosAdd size={30} />
            Criar
          </button>
        </div>
      </nav>
      <div className="relative">
        {isOpen && <Popover handleToggle={togglePopover} />}
      </div>
    </>
  );
};

export default Nav;
