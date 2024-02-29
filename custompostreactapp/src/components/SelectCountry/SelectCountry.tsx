import { optionsType } from '@/src/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import style from './SelectCountry.module.css'

import { FC } from 'react';
import { ScrollArea } from '../ui/scroll-area';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
type propsSearch = {
  setSearch: (e: string) => void;
  options: optionsType[];
  regionId: string;
  className: string;
  search: string;
};

export const SelectCountry: FC<propsSearch> = ({
  setSearch,
  options,
  regionId,
  className,
  search
}) => {
  const handleChange = (e: string) => {
    setSearch(e);
  };

  return (
    <div className={className}>
      <Select onValueChange={(e) => handleChange(e)} value={search}>
        <SelectTrigger className='bg-[#DCE0EC]'>
          <SelectValue placeholder='Select a country' />
        </SelectTrigger>

        <SelectContent className='bg-[#fff]'>
          <Command className='bg-[#fff]'>
            <CommandInput placeholder='Search' className={`bg-transparent border-none outline-none text-[12px] text-[#BBBCC4] ${style.inputSearch}`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <ScrollArea className='h-52 '>
                <CommandGroup >
                  <SelectGroup>
                    {
                      <CommandItem >
                        <SelectItem
                          key='0'
                          value='0'
                        >
                          All countries
                        </SelectItem>
                      </CommandItem>
                    }
                    {options.map((item) => {
                      return (
                        <CommandItem >
                          <SelectItem className='w-full' key={item.id} value={item.title}>
                            {item.title}
                          </SelectItem>
                        </CommandItem>
                      );
                    })}
                  </SelectGroup>
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </SelectContent>
      </Select>
    </div>
  );
};
