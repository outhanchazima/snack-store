"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchQueryAtom } from "@/lib/store";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchBar() {
  const [localQuery, setLocalQuery] = useState("");
  const [, setSearchQuery] = useAtom(searchQueryAtom);
  const debouncedQuery = useDebounce(localQuery, 300);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search snacks..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-9 w-full"
      />
    </div>
  );
}