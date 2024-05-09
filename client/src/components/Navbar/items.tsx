import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { ElementType, FC } from "react";

interface NavItemProps {
    label: string;
    href?: string;
    items?: SubItemProps[];
    icon?: string;
  }
  
  interface SocialLinkProps {
    items: { href: string; arialabel: string; Icon: ElementType }[];
  }
  
  interface SubItemProps {
    label: string;
    href: string;
    desc?: string;
    icon: string;
  }

export const NavigationItems: FC<{
    items: NavItemProps[];
    onAbort: () => void;
  }> = ({ items, onAbort }) => {
    return (
      <>
        {items.map((item, index) => (
          <NavigationItem key={index} item={item} onAbort={onAbort} />
        ))}
      </>
    );
  };
  
  export const NavigationItem: FC<{
    item: NavItemProps;
    onAbort: () => void;
  }> = ({ item: { label, items, href }, onAbort }) => {
    if (items) {
      return (
        <Dropdown>
          <DropdownTrigger className="hover:text-primary text-white hover:cursor-pointer">
            <NavbarItem>{label}</NavbarItem>
          </DropdownTrigger>
          <DropdownMenu aria-label={label} className="w-[340px]">
            {items.map(({ href, icon, desc, label }, index) => (
              <DropdownItem
                onAbort={onAbort}
                key={index}
                href={href}
                startContent={<Image src={icon} width={30} height={30} alt="" />}
                description={desc}
              >
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <NavbarItem className="hover:text-primary text-white">
        <Link onClick={onAbort} href={href!}>
          {label}
        </Link>
      </NavbarItem>
    );
  };
  