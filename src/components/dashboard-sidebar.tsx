"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import Image from "next/image";
import whiteLogo from "../../public/whitelogo.svg";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import { LogOut, Menu, FileText, Search, X } from "lucide-react";

import NavItem from "./nav-item";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>("");

  const { user, signOut, isLoading } = useAuth();

  useEffect(() => {
    if (pathName === "/") {
      setCurrentPage("explore");
    } else if (pathName === "/user/vehicles") {
      setCurrentPage("anuncios");
    } else {
      setCurrentPage("");
    }
  }, [pathName]);

  const handleSignOut = async () => {
    signOut();
  };

  const NavItems = () => (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col space-y-2 px-4">
        <NavItem
          href="/"
          icon={<Search className="mr-2 h-5 w-5" />}
          active={currentPage === "explore"}
        >
          Explorar
        </NavItem>
        <NavItem
          href={`/user/vehicles`}
          icon={<FileText className="mr-2 h-5 w-5" />}
          active={currentPage === "anuncios"}
        >
          Seus anúncios
        </NavItem>
      </div>
      <div className={cn("px-4", isLoading ? "hidden" : "block")}>
        {user ? (
          <NavItem
            onClick={handleSignOut}
            icon={<LogOut className="mr-2 h-5 w-5 " />}
          >
            Sair
          </NavItem>
        ) : (
          <NavItem href="/auth" icon={<LogOut className="mr-2 h-5 w-5 " />}>
            Fazer Login
          </NavItem>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="absolute top-2 right-2 md:hidden">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild className="cursor-pointer">
            <Button
              variant={"outline"}
              className="cursor-pointer"
              size={"icon"}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-[#1c1d1f] h-full [&>button.ring-offset-background]:hidden border-0 py-8"
          >
            <SheetTitle>
              <div className="flex flex-col items-center justifya-center py-8">
                <Image src={whiteLogo} alt="logo" width={120} height={120} />
              </div>
            </SheetTitle>
            <SheetClose asChild>
              <Button className="cursor-pointer absolute top-2 right-2 custom-close bg-[#1c1d1f]">
                <X size={32} className="text-white" />
                <span className="sr-only">Close Sidebar</span>
              </Button>
            </SheetClose>
            <nav className="h-full">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <nav className="fixed hidden md:flex h-screen bg-[#1c1d1f] w-80 flex-col space-y-12 py-10">
        <div className="flex flex-col items-center justifya-center">
          <Image src={whiteLogo} alt="logo" width={120} height={120} />
        </div>
        <NavItems />
      </nav>
    </>
  );
}
