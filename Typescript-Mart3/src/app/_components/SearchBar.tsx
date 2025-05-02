"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const focusInput = () => {
        searchInputRef.current?.focus();
    };

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
            />
        </div>
        <div className="absolute mt-10 z-50 flex items-center border-gray-300 rounded-lg px-2">
            {searchResults.length > 0 && (
              <div className="mt-2">
              {searchResults.map((result: any) => (
                  <div key={result._id} className="p-2 border bg-white hover:bg-gray-100">
                      {result.name} {/* Affiche les résultats de recherche */}
                  </div>
              ))}
          </div>
              )}
        </div>
      </div>
    );
}
