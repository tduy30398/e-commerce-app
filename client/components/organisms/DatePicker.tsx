'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  isError?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  isError,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [displayMonth, setDisplayMonth] = React.useState<Date | undefined>(
    value
  );

  React.useEffect(() => {
    if (value) {
      setDisplayMonth(value);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              'w-full justify-between border-[#889397] rounded-2xl font-normal text-base h-[50px]',
              isError && 'border-red-500 text-red-500',
              className
            )}
          >
            {value ? format(value, 'dd/MM/yyyy') : 'Select date'}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              onChange(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
