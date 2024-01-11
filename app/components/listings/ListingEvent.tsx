'use client';

import { SafeEvent  } from "@/app/types";
// for to convert date
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { FiClock } from 'react-icons/fi';
interface ListingEventProps {
  events: SafeEvent[]
}


const ListingEvent: React.FC<ListingEventProps> = ({ 
  events,
 }) => {

  console.log(events);
  function convertdate(dateString: string){
    const dateTime = parseISO(dateString);
    const formattedDate = format(dateTime, 'dd MMM yyyy', { locale: fr });
    const formattedTime = format(dateTime, 'HH:mm', { locale: fr });
  
    const convertedDate = `${formattedDate} ${formattedTime}`;
    return convertedDate;
  
  }
  return ( 
    <div className="overflow-x-auto">
        <table className="table w-full border-collapse border border-slate-400">
            <thead>
              <tr>
                <th className="border border-slate-300">#</th>
                <th className="border border-slate-300">Du </th>
                <th className="border border-slate-300">Au</th>
                <th className="border border-slate-300">Thème</th>
              </tr>
            </thead>
            <tbody>
              { events &&  events.length > 0 ?   events.map((event, index) => (
                  <tr  key={event.id} className="text-center" >
                      <td className="border border-slate-300"><FiClock /></td>
                      <td className="border border-slate-300">{convertdate(event.startDate)}</td>
                      <td className="border border-slate-300">{convertdate(event.endDate)}</td>
                      <td className="border border-slate-300 font-bold">{event.title}</td>
                  </tr>
              )) :  (<p>Aucun événement en cours pour ce site.</p>) 
              }
             
            </tbody>
        </table>
    </div>

   );
}
 
export default ListingEvent;