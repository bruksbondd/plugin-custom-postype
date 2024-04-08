import { optionsType } from "@/src/type";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import style from "./SelectCountry.module.css";

import { FC, useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
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
  search,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: string) => {
    setSearch(e);
  };

  const inputElement: any = useRef(null);

  const [width, setWidth] = useState<number>(window.innerWidth);


  let isDesc = width >= 668;

  useEffect(() => {
    const onResize = (event: Event) => {
      event.stopImmediatePropagation();
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);



  useEffect(() => {
    if (inputElement.current) {
    setTimeout(() => {
        inputElement?.current?.focus();
    }, 100);
  }
  }, [search, options, inputElement]);

  return (
    <div className={className}>
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        onValueChange={(e) => handleChange(e)}
        value={search}
      >
        <SelectTrigger
          className="bg-[#DCE0EC]"
          onPointerDown={(e) => e.preventDefault()}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>

        <SelectContent position="popper" className="bg-[#fff]">
          <Command className="bg-[#fff]">
            {isDesc &&
            <CommandInput
              placeholder="Search"
              ref={inputElement}
              onValueChange={(e) => handleChange(e)}
              className={`bg-transparent border-none outline-none text-[12px] text-[#BBBCC4] ${style.inputSearch}`}
            />}

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <ScrollArea className="h-52 ">
                <CommandGroup>
                  <SelectGroup>
                    {
                      <CommandItem>
                        <SelectItem key="0" value="0">
                          All countries
                        </SelectItem>
                      </CommandItem>
                    }
                    {options.map((item) => {
                      return (
                        <CommandItem key={item.id}>
                          <SelectItem
                            className="w-full"
                            key={item.id}
                            value={item.title}
                          >
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
