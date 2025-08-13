"use client";
import Link from "next/link";
import { links } from "./NavLinks";
import { cn } from "@/lib/utilities";
import { usePathname, useRouter } from "next/navigation";
import { AuthButton } from "../ui/authButton";
import { SquareMenu, SquareX } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function DropdownMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (dropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [dropdown]);

  function handleSelectMenu(route: string) {
    router.push(route);
    setDropdown(false);
  }
  return (
    <div>
      {!dropdown ? (
        <div className="flex justify-end items-center w-full md:hidden ">
          <SquareMenu
            onClick={() => setDropdown(!dropdown)}
            className="dark:text-white text-black cursor-pointer"
          />
        </div>
      ) : (
        <div className=" bg-white dark:bg-black fixed inset-0 z-50 flex flex-col items-center justify-between">
          <div className="flex justify-end items-center w-full pr-4 pt-4">
            <SquareX
              onClick={() => setDropdown(!dropdown)}
              className="dark:text-white text-black cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-between h-full mt-12">
            <div className="flex flex-col gap-12  items-center">
              {links.map((link) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleSelectMenu(link.href)}
                    key={link.name}
                  >
                    <p
                      className={cn(
                        pathname === link.href
                          ? "text-green-600"
                          : "hover:text-green-600"
                      )}
                    >
                      {link.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mb-12">
              <AuthButton type="navBar" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
