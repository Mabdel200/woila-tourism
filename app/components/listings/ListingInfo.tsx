'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeEvent, SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import ListingEvent from "./ListingEvent";
import React from "react";


const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});


interface ListingInfoProps {
  listingId: string,
  user: SafeUser,
  description: string;
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;

}

const ListingInfo: React.FC<ListingInfoProps> =  ({
  user,
  description,
  category,
  locationValue,
  listingId,

}) => {

  // console.log("listingId is :", listingId); 

  const { getByValue } = useCountries();
  const [eventsList, setEventsList] = React.useState<SafeEvent[]>([]);
  
    React.useEffect(() => {   
      const fetchData = async () => {
        try {
          
          // console.log('Fetching data for Listing ID:', listingId);
          const response = await fetch(`/api/events/${listingId}`);
          const dataEvent = await response.json();
          // console.log('Data fetched:', dataEvent);
          setEventsList(dataEvent);
        } catch (error) {
          // console.error('Error fetching data:', error);
        }
      };
      if (typeof window !== 'undefined') {
        fetchData();
      }
    }, [listingId]); 
    console.log(eventsList);

  // To get data of sites. 
  const coordinates = getByValue(locationValue)?.latlng

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Publié par {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon} 
          label={category?.label}
          description={category?.description} 
         
        />
      )}
      <hr />
     {/* Afficher la liste des événements */}
      <div className="flex flex-col gap-4">
        <div className="font-semibold text-lg  text-orange-600">Évènements:</div>
          <ListingEvent
             events={eventsList}           
          /> 
        </div>
      <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
   );
}
 
export default ListingInfo;