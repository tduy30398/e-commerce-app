import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

interface SelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; title: string }[];
  placeholder?: string;
}

const Selector = ({
  value,
  onValueChange,
  options,
  placeholder,
}: SelectorProps) => {
  const t = useTranslations('product');

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {t(option.title)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Selector;
