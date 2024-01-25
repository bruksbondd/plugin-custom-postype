import React, { useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header/Header'
import axios from 'axios'
import { postType } from './type'
import { List } from './components/List/List'

function App() {

  const [postsType, setPostsType] = useState<postType[]>([]);
  const [search, setSearch] = useState('');
 
    useEffect(() => {
      // http://swivelt:81
        axios.get(`/wp-json/react_api/v1/country?number=4${search && '&search=' + search }`)
            .then(res => {
              setPostsType(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [search]);
  
  return (
    <div className="App">
   
      <Header setSearch={setSearch} search={search} />
      <List postsType={postsType} />
    </div>
  );
}

export default App;
