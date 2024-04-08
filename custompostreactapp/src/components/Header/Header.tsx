import { useState, useEffect, FC } from "react";
import axios from "axios";

import { SelectCountry } from "../SelectCountry/SelectCountry";

import { optionsRegionType, optionsType, postType } from "../../type";
import { SelectRegion } from "../SelectRegion/SelectRegion";
import { Button } from "../ui/button";

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

  let route = "";
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    route = "https://swivelt.com";
  }

  const handleReset = () => {
    setSearch("");
    setRegionId("");
  };

  const handleClick = () => {
    window.location.href = 'https://swivelt.com/global-guide/'
  }


  useEffect(() => {
    axios
      .get(
        `${route}/wp-json/react_api/v1/country${
          regionId && "/?region=" + regionId
        }`
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
    <div className="flex justify-between items-center my-[2%] md:my-[1%] flex-wrap">
      {/* <SearchCountry setSearch={setSearch}  options={options}/> */}
      <SelectRegion
        className="relative flex-grow-1 flex-shrink-1 mx-[1%] w-[48%] lg:w-[23%] z-[999]"
        setRegionId={setRegionId}
        setSearch={setSearch}
        options={optionsRegion}
        regionId={regionId}
      />

      <SelectCountry
        className="relative flex-grow-1 flex-shrink-1 mx-[1%] w-[48%] lg:w-[23%] z-[999]"
        setSearch={setSearch}
        options={options}
        regionId={regionId}
        search={search}
      />
      <div className="relative flex-grow-1 flex-shrink-1 mx-[1%] w-[8%] md:w-[8%] lg:w-[23%] hidden sm:block">
        <span className="text-[#1255E1] cursor-pointer" onClick={handleReset}>
          Reset
        </span>
      </div>

      <div className="flex  justify-center sm:justify-end relative flex-grow-1 flex-shrink-1 my-[10px]  w-[100%] md:w-[48%] lg:w-[23%]">
        <Button onClick={handleClick} className="bg-[#fec618] rounded-[4px] text-[15px] text-[white] font-bold hover:bg-[#E0A203] "  >All Countries</Button>
      </div>
    </div>
  );
};

export default Header;
