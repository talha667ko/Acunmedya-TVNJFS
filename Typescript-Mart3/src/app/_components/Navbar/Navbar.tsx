"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../SearchBar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);


  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLoggedIn = true; // Replace with your authentication logic
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div
        className="container flex 
      items-center 
      h-16
      mx-auto
      px-4
      justify-between"
      >
        <Link className="font-bold text-xl" href={"/"}>
          Fight Club Shop
        </Link>

        
        {/* Desktop Navbar */}
        {/* md:flex -> Medium ve üstü ekranlarda flex yapısıyla gözük. */}
        <div className="hidden md:flex space-x-6 cursor-pointer">
          <Link href={"/"}>Home</Link>
          <Link href={"/About-us"}>About us</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p>Categories</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer" >
                Hommes
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Femmes
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Enfants
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        {/* Desktop Navbar */}

        {/* Search bar*/}
        <SearchBar />
        <div className="flex">
          {isLoggedIn ? (
            <Link href={"/Account"}>
              <Button className="cursor-pointer"><User/></Button>
            </Link>
          ) : (
            <Link href={"/Auth/Log-in"}>
              <Button className="cursor-pointer">Log in</Button>
            </Link>
          )}
          </div>
        {/* Mobile Navbar Button */}
        <div className="md:hidden">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {/* Mobile Navbar */}

        {/* md:hidden -> Medium ve üstü ekranlarda hidden yani görünmez olması */}
        <div
          className={
            "fixed inset-0 top-16 bg-background z-50 md:hidden " +
            (isMobileMenuOpen ? "flex flex-col" : "hidden")
          }
        >
          <div className="flex flex-col space-y-4 p-6">
            <Link href={"/"}>Home</Link>
            <Link href={"/About-us"}>About us</Link>
            <Link href={"/"}>Categories</Link>
          </div>
        </div>

        {/* Mobile Navbar*/}

        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer">Dil</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Choisissez une langue</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Français 🇫🇷
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                English 🇬🇧
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
      </div>
    </nav>
  );
}
