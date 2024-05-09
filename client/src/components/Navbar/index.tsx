"use client";
import { FC, useCallback, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { ConnectButton } from "../ConnectButton";
import { navItems } from "@/data/metadata";
import { NavigationItems } from "./items";
import { Logo } from "../Logo";
import { Announcement } from "../Announcement";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="fixed w-full z-50">
      <NextUINavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        position="sticky"
        maxWidth="full"
        className="bg-black"
      >
        <NavbarContent className="max-w-6xl w-full lg:mx-auto px-6">
          <Logo />
          <NavbarContent className="hidden lg:flex">
            <NavigationItems items={navItems} onAbort={handleCloseMenu} />
          </NavbarContent>

          <NavbarContent justify="end">
            <ConnectButton />
            <div className="h-full flex gap-3 items-center lg:hidden">
              <NavbarMenuToggle className="text-white" />
            </div>
          </NavbarContent>

          <NavbarMenu className="bg-black backdrop-blur-xl flex flex-col justify-between">
            <NavbarMenuItem>
              <div className="flex flex-col gap-4 mt-3">
                <div></div>
                <Divider className="bg-gray-400 bg-opacity-60" />
                <NavbarContent className="flex">
                  <ul className="flex flex-col gap-3 justify-start">
                    <NavigationItems
                      items={navItems}
                      onAbort={handleCloseMenu}
                    />
                  </ul>
                </NavbarContent>
              </div>
            </NavbarMenuItem>
            <div className="mb-4">
              <Divider className="bg-gray-400 bg-opacity-60" />
              <div className="flex justify-between mt-3">
                <div className="text-sm sm:text-base flex gap-2 sm:gap-4">
                  <Link href={"/"} className="text-white hover:text-primary">
                    Privacy Policy
                  </Link>
                  <Link href={"/"} className="text-white hover:text-primary">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </NavbarMenu>
        </NavbarContent>
      </NextUINavbar>
      <div className="hidden lg:inline">
        <Announcement
          message="BitRaise has just launched it's investment raising service for public. "
          url=""
          cta="View Latest"
        />
      </div>
    </div>
  );
};

export { Navbar };
