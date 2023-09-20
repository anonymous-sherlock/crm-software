"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const Search = () => {
  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(
        "relative inline-flex h-9 w-40 items-center justify-start rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none bg-white dark:bg-transparent focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64"
      )}
      onClick={() => {
        var event = new KeyboardEvent("keydown", {
          key: "k",
          ctrlKey: true, // for Ctrl + K
          metaKey: true, // for Command + K
        });

        document.dispatchEvent(event);
      }}
    >
      <span className="hidden lg:inline-flex">Search documentation...</span>
      <span className="inline-flex lg:hidden">Search...</span>
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};

export default Search;
