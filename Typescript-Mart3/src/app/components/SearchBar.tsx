"use client";
import { Search } from "lucide-react";
import { useRef } from "react";

export default function SearchBar() {
    const searchInputRef = useRef<HTMLInputElement>(null); 
    const focusInput = () => {
        searchInputRef.current?.focus(); // ⬅️ Met l’input en focus
      };
    
    return (
        <div 
  tabIndex={0} className="flex border items-center border-gray-300 rounded-lg px-2 focus-within:ring-2 focus-within:border-none focus-within:ring-ring">
          <Search className="hover:cursor-text" color="gray" onClick={focusInput}/>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border-none rounded-lg focus:outline-none focus:none w-full"
          />
        </div>
    );
}