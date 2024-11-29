"use client";


import { Button } from "@/components/ui/button";
import { languagesStyleGuides } from "@/lib/data";
import { AiOutlineEdit } from "react-icons/ai";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SheetEdit() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button
          className="w-12 h-12 py-2 px-2 bg-black rounded-full border
					border-neutral-800 hover:border-neutral-200 transition-colors peer"
        >
          <AiOutlineEdit className="text-white peer-hover:text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="w-full h-full bg-black  backdrop-blur-lg border-l-neutral-800 rounded-bl-2xl rounded-tl-2xl
								flex flex-col justify-center overflow-hidden 
								px-4 sm:px-20 md:px-20 xl:px-28 2xl:px-36
								gap-y-12"
								
      >
				{/* sphere */}
					<div className="radial-ellipse-dashboard w-full aspect-square
			fixed left-0 -bottom-[20%] md:-bottom-1/4 lg:-bottom-1/4
			  xl:-bottom-1/4 "></div>

        <SheetHeader>
          <SheetTitle className="text-white text-center text-7xl md:text-8xl lg:text-7xl 2xl:text-8xl 
					 font-poppins z-40 mb-4">
            Choose your <br /> <span className="">style guide</span>
          </SheetTitle>
        </SheetHeader>
        <div className="w-full flex flex-col items-center gap-y-4">
          {languagesStyleGuides.map((language) => (
            <div
              className="w-full flex items-center justify-between gap-x-2"
              key={language.id}
            >
              {/* <h3 className="font-poppins text-md text-neutral-200">
													{language.name}
												</h3> */}
              <Select>
                <SelectTrigger className="w-full py-6 text-neutral-400 hover:text-neutral-400 transition-colors bg-black 
								rounded-2xl font-poppins text-sm z-40 border border-neutral-800">
                  <SelectValue
                    className="font-poppins"
                    placeholder={language.styleGuide}
                  />
                </SelectTrigger>
                <SelectContent className="w-full bg-black border border-neutral-800 rounded-2xl">
                  <SelectGroup>
                    {language.styleGuide.map((styleGuide) => (
                      <SelectItem
                        key={language.id}
                        className="text-neutral-400 cursor-pointer hover:text-neutral-200 transition-colors font-poppins text-sm"
                        value={language.id}
                      >
                        {styleGuide}
                      </SelectItem>
                    ))}
                    <SelectItem
                      className="text-neutral-400 cursor-pointer hover:text-neutral-200 transition-colors font-poppins text-sm"
                      value="uploadNew"
                    >
                      + Upload new
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <SheetFooter className="w-full flex justify-center items-center">
          <SheetClose asChild>
            <Button
              className="py-6 w-full text-xl bg-white text-black font-poppins rounded-2xl z-40"
              type="submit"
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
