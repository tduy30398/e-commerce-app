'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useDebounce } from '@/hooks/useDebouce';
import useSWR from 'swr';
import { getAllProducts } from '@/actions/product';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const SearchForm: React.FC = () => {
  const router = useRouter();

  const [value, setValue] = React.useState('');
  const debouncedValue = useDebounce(value, 500);
  const [isOpen, setIsOpen] = React.useState(false);
  const [manualClose, setManualClose] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const queryKey = ['product-complete', debouncedValue];

  const { data: products, isLoading } = useSWR(
    debouncedValue ? queryKey : null,
    () =>
      getAllProducts({
        search: debouncedValue,
        limit: 10,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  React.useLayoutEffect(() => {
    if (products) {
      requestAnimationFrame(() => {
        inputRef.current?.focus({ preventScroll: true });
        // Optional: keep caret at end
        const el = inputRef.current;
        if (el) {
          const len = el.value.length;
          el.setSelectionRange?.(len, len);
        }
      });
    }
  }, [products]);

  React.useEffect(() => {
    if (debouncedValue && products?.data.length && !manualClose) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedValue, products, manualClose]);

  return (
    <div className="relative w-full hidden sm:block ml-10" >
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
            <Input
              ref={inputRef}
              name="query"
              type="search"
              placeholder="Search for products..."
              className="pl-10 bg-flash-white rounded-3xl h-12 text-base!"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setManualClose(false);
                setHighlightedIndex(-1);
              }}
              onKeyDown={(e) => {
                if (products?.data?.length) {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                      prev < products.data.length - 1 ? prev + 1 : 0
                    );
                  }

                  if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                      prev > 0 ? prev - 1 : products.data.length - 1
                    );
                  }
                }

                if (e.key === 'Enter') {
                  e.preventDefault();

                  if (highlightedIndex >= 0 && products?.data?.[highlightedIndex]) {
                    const selectedProduct = products.data[highlightedIndex];
                    router.push(`${ROUTES.PRODUCT}/${selectedProduct._id}`);
                  } else {
                    router.push(`${ROUTES.PRODUCT}?query=${value}`);
                  }

                  setIsOpen(false);
                  setManualClose(true);
                }
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          style={{ width: inputRef.current?.offsetWidth }}
          className="p-0 rounded-xl"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            requestAnimationFrame(() => {
              inputRef.current?.focus();
            });
          }}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {isLoading ? (
            <div className="p-4 text-sm text-muted-foreground">
              Searching...
            </div>
          ) : (
            <ul className="max-h-50 overflow-y-auto custom-scrollbar">
              {products?.data.map((product, index) => (
                <li key={product._id} className="h-10">
                  <Link
                    href={`${ROUTES.PRODUCT}/${product._id}`}
                    className={
                      cn("block px-4 py-2 hover:bg-accent hover:text-accent-foreground",
                        highlightedIndex === index && "bg-accent text-accent-foreground"
                      )}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => {
                      setIsOpen(false);
                      setManualClose(true);
                    }}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchForm;
