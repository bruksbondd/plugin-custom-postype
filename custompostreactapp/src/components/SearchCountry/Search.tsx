import React, { ChangeEvent, FC } from 'react';
import { Input } from '../ui/input';
import { Search } from '../ui/search'
import { optionsType } from '@/src/type'

type propsSearch = {
  setSearch: (e: string) => void;
  options: optionsType[]
}

export const SearchCountry: FC<propsSearch> = ({setSearch, options}) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className='m-2'>
        <Search  name='search' id='search' onChange={handleChange} placeholder='Search country' />
    </div>
  );
};
