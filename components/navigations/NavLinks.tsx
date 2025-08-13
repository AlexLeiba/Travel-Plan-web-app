"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utilities";
import { AuthButton } from "../ui/authButton";
import { DropdownMenu } from "./DropdownMenu";
import { useSession } from "next-auth/react";

export const links = [
  // { name: 'Home', href: '/' },
  { name: "Dashboard", href: "/dashboard" },
  { name: "My trips", href: "/my-trips" },
  { name: "Globe", href: "/globe" },
];
export function NavLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.email ? (
        <>
          <div className=" gap-8 items-center hidden md:flex">
            {links.map((link) => {
              return (
                <Link key={link.name} href={link.href}>
                  <p
                    className={cn(
                      pathname === link.href
                        ? "text-green-600"
                        : "hover:text-green-600"
                    )}
                  >
                    {link.name}
                  </p>
                </Link>
              );
            })}
            <AuthButton type="navBar" />
          </div>

          <DropdownMenu />
        </>
      ) : (
        <div className="w-full">
          <AuthButton type="landingPage" />
        </div>
      )}
    </div>
  );
}
