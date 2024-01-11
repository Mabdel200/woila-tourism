'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  // onAccommodationChange: (value: boolean) => void; // Nouvelle fonction pour gérer le changement d'état du checkbox
  // isAccommodationRequested: boolean; // Nouvel état pour déterminer si l'hébergement est demandé
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  // onAccommodationChange, // Nouvelle fonction
  // isAccommodationRequested, // Nouvel état
  disabled,
  disabledDates
}) => {
  return ( 
    <div 
      className="
      bg-white 
        rounded-xl 
        border-[1px]
        shadow-xl
      border-neutral-200 
        overflow-hidden
        stylecard
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4 text-white text-center">
        <div className="text-2xl text-rose-500  font-semibold">
         Planifier une visite ?
        </div>
       
      </div>
      {/* ====================================== */}
      {/* Ajout du champ de type checkbox */}
      {/* <div className=" flex flex-row items-center gap-2 p-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAccommodationRequested}
            onChange={(e) => onAccommodationChange(e.target.checked)}
            className="mr-2"
          />
            <div className=" font-semibold">
              Souhaitez-vous être hébergé ?
            </div>
          
        </label>
      </div> */}
      {/* ====================================== */}
      <hr />
      <div className="p-4 ">
        Veuillez  Indiquer la date de la visite sur le calendrier.
      </div>
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
        />

      <hr />

      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Planifier" 
          onClick={onSubmit}
        />
      </div>
      {/* <hr /> */}
      {/* <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
          $ {totalPrice}
        </div>
        
      </div> */}
    </div>
   );
}
 
export default ListingReservation;