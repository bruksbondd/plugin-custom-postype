import { useEffect, useState } from 'react';

import './App.css';
import Header from './components/Header/Header';
import axios from 'axios';
import { postType } from './type';
import { List } from './components/List/List';

function App() {
  const [postsType, setPostsType] = useState<postType[]>([]);
  const [search, setSearch] = useState('');
  const [regionId, setRegionId] = useState('');

  let route = '';
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    route = 'https://swivelt.com';
  }

  useEffect(() => {
   
    axios
      .get(
        `${route}/wp-json/react_api/v1/country?number=${regionId === '0' || search === '0' ? -1 : 4}${
          search && '&search=' + search
        }${regionId && '&region=' + regionId}`,
      )
      .then((res) => {
        setPostsType(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, regionId]);

  return (
    <div className='App'>
      <Header
        setSearch={setSearch}
        search={search}
        regionId={regionId}
        setRegionId={setRegionId}
      />
      <List postsType={postsType} />
    </div>
  );
}

export default App;
