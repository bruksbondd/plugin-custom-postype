import { optionsType, postType } from '@/src/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ChangeEvent, FC } from 'react';

type propsSearch = {
  setSearch: (e: string) => void;
  options: optionsType[];
};

export const SelectCountry: FC<propsSearch> = ({ setSearch, options }) => {
  const handleChange = (e: string) => {
    setSearch(e);
  };

  return (
    <div className='m-2'>
      <Select onValueChange={(e) => handleChange(e)}>
        <SelectTrigger className='w-[280px] '>
          <SelectValue placeholder='Select a country' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className='text-slate-800' key='0' value="#">
              All countries
            </SelectItem>
            {options.map((item) => {
              return (
                <SelectItem key={item.id} value={item.title}>
                  {item.title}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
