'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

const LocaleSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const changeLocale = (locale: string) => {
    router.push(pathname, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-25 p-0 border-none shadow-none cursor-pointer text-base"
        >
          <Languages className="size-5" />
          {locales.find((l) => l.code === locale)?.label?.slice(0, 3) ?? ''}
          <ChevronDown className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-25">
        {locales.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLocale(code)}
            className={cn(
              locale === code ? 'bg-accent text-[#006CFA]' : null,
              'flex items-center gap-1 cursor-pointer hover:text-[#006CFA]!'
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitch;
