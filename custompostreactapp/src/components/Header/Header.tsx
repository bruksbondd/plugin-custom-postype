import { useState, useEffect, FC } from 'react';
import axios from 'axios';

import { SelectCountry } from '../SelectCountry/SelectCountry';

import { optionsRegionType, optionsType, postType } from '../../type';
import { SelectRegion } from '../SelectRegion/SelectRegion';

type propsHeader = {
  setSearch: (e: string) => void;
  search: string;
  setRegionId: (e: string) => void;
  regionId: string;
};

const Header: FC<propsHeader> = ({
  setSearch,
  setRegionId,
  regionId,
  search,
}) => {
  const [options, setOptions] = useState<optionsType[]>([]);
  const [optionsRegion, setOptionsRegion] = useState<optionsRegionType[]>([]);

  let route = '';
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    route = 'https://swivelt.com';
  }

  const handleReset = () => {
    setSearch('');
    setRegionId('');
  };

  useEffect(() => {
    axios
      .get(
        `${route}/wp-json/react_api/v1/country${
          regionId && '/?region=' + regionId
        }`,
      )
      .then((res) => {
        const titles = res.data.map((p: postType) => {
          return { title: p.title, id: p.id };
        });
        setOptions(titles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [regionId]);

  useEffect(() => {
    axios
      .get(`${route}/wp-json/react_api/v1/region`)
      .then((res) => {
        const regions = res.data.map((p: optionsRegionType) => {
          return { name: p.name, id: p.id };
        });
        setOptionsRegion(regions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='flex justify-between items-center my-[2%] md:my-[1%]'>
      {/* <SearchCountry setSearch={setSearch}  options={options}/> */}
      <SelectRegion
        className='relative flex-grow-1 flex-shrink-1 mx-[1%] w-[100%] md:w-[48%] lg:w-[23%] z-[999]'
        setRegionId={setRegionId}
        setSearch={setSearch}
        options={optionsRegion}
        regionId={regionId}
      />

      <SelectCountry
        className='relative flex-grow-1 flex-shrink-1 mx-[1%] w-[100%] md:w-[48%] lg:w-[23%] z-[999]'
        setSearch={setSearch}
        options={options}
        regionId={regionId}
        search={search}
      />
      <div className='relative flex-grow-1 flex-shrink-1 mx-[1%] w-[8%] md:w-[8%] lg:w-[23%]'></div>

      <div className='flex justify-end relative flex-grow-1 flex-shrink-1 mx-[1%] w-[10%] md:w-[48%] lg:w-[23%]'>
        <span className='text-[#1255E1] cursor-pointer' onClick={handleReset}>
          Reset
        </span>
      </div>
    </div>
  );
};

export default Header;
