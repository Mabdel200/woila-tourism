'use client';

// import { IconType } from "react-icons";
// Import the specific icon you want to use
// import { FaBeer, FaCoffee } from 'react-icons/fa';
import { SafeEvent,  SafeListing,  } from "@/app/types";
import { Icon } from 'leaflet';

interface ListingEventProps {
  // icon: Icon,
  data: SafeListing;
  events: SafeEvent[]
}


const ListingEvent: React.FC<ListingEventProps> = ({ 
  data,
  // icon: Icon,
  events,
 
 }) => {

  console.log(events);

  return ( 
    <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-slate-400">
            <thead>
              <tr>
                <th className="border border-slate-300">N°</th>
                <th className="border border-slate-300">Thème</th>
                <th className="border border-slate-300">Description</th>
              </tr>
            </thead>
            <tbody>
              { events &&  events.length > 0 ?   events.map((event, index) => (
                  <tr  key={event.id} className="text-center" >
                      <td className="border border-slate-300">{index + 1}</td>
                      <td className="border border-slate-300">{event.title}</td>
                      <td className="border border-slate-300">{event.description}</td>
                  </tr>
              )) :  (<p>Aucun événement en cours pour ce site.</p>) 
              }
             
            </tbody>
        </table>
    </div>

   );
}
 
export default ListingEvent;