import { useState, useEffect, FormEvent, ChangeEvent, FC } from 'react';
import axios from 'axios';

import styles from './Header.module.css';

import { SelectCountry } from '../SelectCountry/SelectCountry'
import { SearchCountry } from '../SearchCountry/Search'
import { optionsType, postType } from '../../type'

type propsHeader = {
  setSearch: (e: string) => void;
  search: string;
};



const Header: FC<propsHeader> = ({ setSearch, search }) => {

  const [options, setOptions] = useState<optionsType[]>([]);

  useEffect(() => {
    axios.get(`/wp-json/react_api/v1/country`)
        .then(res => {
          
          const titles = res.data.map((p: postType ) => {
            return {title: p.title, id: p.id}
          })
          setOptions(titles);
        })
        .catch(err => {
            console.log(err);
        });
}, []);



  return (
    <div className='flex justify-center items-center'>
        <SearchCountry setSearch={setSearch}  options={options}/>
        <div>or</div>
        <SelectCountry setSearch={setSearch} options={options} />
    </div>
  );
};

export default Header;
