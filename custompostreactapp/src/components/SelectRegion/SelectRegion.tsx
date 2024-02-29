import { optionsRegionType } from '@/src/type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {  FC } from 'react';

type propsSelectRegion = {
  setRegionId: (e: string) => void;
  options: optionsRegionType[];
  setSearch: (e: string) => void;
  className: string;
  regionId: string;
};

export const SelectRegion: FC<propsSelectRegion> = ({
  setRegionId,
  setSearch,
  options,
  className,
  regionId
}) => {
  const handleChange = (e: string) => {
    if (e !== '#') setRegionId(e);
    if (e === '#') setRegionId('');
    setSearch('');
  };

  return (
    <div className={className} >
      <Select onValueChange={(e) => handleChange(e)} value={regionId} >
        <SelectTrigger className='bg-[#DCE0EC]'>
          <SelectValue placeholder='Select a region' />
        </SelectTrigger>
        <SelectContent className='bg-[#fff]'>
          <SelectGroup>
            <SelectItem className='focus:bg-accent' key='0' value='0'>
              All regions
            </SelectItem>
            {options.map((item) => {
              return (
                <SelectItem key={item.id} value={item.id} className='focus:bg-accent'>
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
