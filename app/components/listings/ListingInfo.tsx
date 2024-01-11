'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeEvent, SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import ListingEvent from "./ListingEvent";
import React from "react";

// Add Style for Slider
import "./slideCss/slider.css";
import Listinghotel from "./Listinghotel";
import Button from "../Button";

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
          font-bold
          text-sm
          text-black
          flex 
          flex-row 
          items-center
          gap-2
          "
        >
          <div>Publié par {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        </div>
        <hr />
          <div className="
              flex 
              flex-row 
              items-center 
            
              font-gray
              text-sm
            "
          >
         Categorie : 
        {category && (
          <ListingCategory
            icon={category.icon} 
            label={category?.label}
            description={category?.description} 
          
          />
        )}

        </div>
        <hr />
        {/* Description */}
        <div className="
           text-base font-semibold text-neutral-600 text-justify">
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{description}
        </div>
     {/* Afficher la liste des événements */}
      <div className="flex flex-col gap-4">
       
        <div className="font-semibold text-xl  text-orange-600">Évènements d&apos;actualités :</div>
          <ListingEvent
            events={eventsList}           
          /> 
      </div>
      {/*  List of Hotel */}
      <div className="flex flex-col ">
        <div className="font-semibold text-xl  text-orange-600">Hôtel à proximité :</div>
            <Listinghotel />     
        </div>
    
      {/* Map  */}
      <div className="shadow-xl">
         <Map center={coordinates} />
      </div>
       
    </div>
     
   );
}
 
export default ListingInfo;