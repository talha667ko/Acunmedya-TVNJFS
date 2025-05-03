"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isFocused, setIsFocused] = useState(false); // État pour gérer le focus

    const focusInput = () => {
        searchInputRef.current?.focus();
    };

    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleUnFocus = () => {
        setIsFocused(false);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);

    };

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (searchQuery.length > 2) {
            debounceTimeoutRef.current = setTimeout(async () => {
                const response = await fetch(`/api/search?query=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data);
            }, 500);
        } else {
            setSearchResults([]);
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    return (
      <div className="relative flex flex-col">
        <div 
            tabIndex={0} 
            className="flex border items-center border-gray-300 rounded-lg px-2 focus-within:ring-2 focus-within:border-none focus-within:ring-ring"
        >
            <Search className="hover:cursor-text" color="gray" onClick={focusInput} />
            <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border-none rounded-lg focus:outline-none focus:none w-full"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleFocus}
                onBlur={handleUnFocus}
            />
        </div>
        
            {isFocused && searchQuery.trim() !== "" && searchResults.length > 0 && (
                <div className="absolute mt-12 w-full z-50 flex items-center border-2 border-black bg-gray-100 rounded-lg scroll-auto">
              <div className="w-full rounded-lg">
              {searchResults.map((result: any) => (
                  <div key={result._id} className="p-2 rounded-lg hover:bg-white ">
                      {result.name}
                  </div>
              ))}
              </div>
          </div>
              )}
      </div>
    );
}
