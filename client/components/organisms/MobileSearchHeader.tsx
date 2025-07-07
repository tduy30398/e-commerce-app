'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const MobileSearchHeader = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      setOpen(false);
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Search className='size-6 cursor-pointer' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-10 left-1/2 -translate-x-1/2 translate-y-0">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitForm}>
            <Input
              name="query"
              type="search"
              placeholder="Search for products..."
              className="bg-flash-white rounded-3xl h-9"
            />
          <DialogFooter>
            <Button
              type="submit"
              variant="default"
              className="rounded-4xl h-10 w-fit px-8 ml-auto mt-4"
            >
              Search
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MobileSearchHeader;
