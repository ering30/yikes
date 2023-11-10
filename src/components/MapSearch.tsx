"use client";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type PlacesProps = {
    setLocation: (position: google.maps.LatLngLiteral) => void;
}
export default function MapSearch( { setLocation }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [open, setOpen] = useState(false);

  console.log({ status, data });

  const handleSelect = async (val:string) => {
    setValue(val, false);
    clearSuggestions();
    
    const results = await getGeocode({address: val});
    const {lat, lng} = await getLatLng(results[0]);
    setLocation({lat, lng});
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search location e.g. Sydney"
          className="border-none my-6 w-[300px]"
          disabled={!ready}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="py-2 flex-col content-center">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
                <Button variant="outline" key={place_id} className="text-sm w-[100%] border-none" onClick={handleSelect}>
                  {description}
                </Button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
