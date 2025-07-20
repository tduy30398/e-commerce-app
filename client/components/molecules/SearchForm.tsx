'use client';

import React from 'react';
import Form from 'next/form';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { ROUTES } from '@/lib/constants';

const SearchForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    if (!query || query.trim() === '') {
      event.preventDefault();
    }
  };

  return (
    <Form
      action={ROUTES.PRODUCT}
      className="relative w-full hidden sm:block ml-10"
      onSubmit={handleSubmit}
    >
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <Search className="text-muted-foreground size-5" />
      </button>
      <Input
        name="query"
        type="search"
        placeholder="Search for products..."
        className="pl-10 bg-flash-white rounded-3xl h-[48px]"
      />
    </Form>
  );
};

export default SearchForm;
