import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href?: string;
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function NavItem({
  href,
  children,
  icon,
  active,
  onClick,
}: NavItemProps) {
  if (href) {
    return (
      <Link
        onClick={onClick}
        href={href}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "text-white bg-blue-600"
            : "text-blue-500 hover:bg-blue-600/10"
        )}
      >
        {icon}
        {children}
      </Link>
    );
  }

  if (!href) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors w-full cursor-pointer",
          active
            ? "text-white bg-blue-600"
            : "text-blue-500 hover:bg-blue-600/10"
        )}
      >
        {icon}
        {children}
      </button>
    );
  }
}
