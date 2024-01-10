'use client';

import { IconCalendarEvent} from "@tabler/icons-react";

const PageScheduleList = ({ 
    dataList,
 }) => {

  console.log(dataList);
  
  return ( 
   
        <table className="table table-auto hover:table-fixed w-auto border-collapse border border-slate-400">
            <thead>
              <tr>
                    <th className="border border-slate-300">N°</th>
                    <th className="border border-slate-300">Visiteur</th>
                    <th className="border border-slate-300">Site T.</th>
                    <th className="border border-slate-300">Visite Prévu le :</th>
                    <th className="border border-slate-300"> Au :</th>
                  
              </tr>
            </thead>
            <tbody>
              { dataList &&  dataList.length > 0 ?   dataList.map((visite, index) => (
                  <tr  key={visite.id} className="text-center" >
                      <td className="border border-slate-300">{index + 1}  <IconCalendarEvent size={18} strokeWidth={1.5} />  </td>
                      <td className="border border-slate-300">{visite.userId}</td>
                      <td className="border border-slate-300">{visite.listingId}</td>
                      <td className="border border-slate-300">{visite.startDate}</td>
                      <td className="border border-slate-300">{visite.endDate}</td>
                     
                      {/* <td className="border border-slate-300">{event.listing}</td> */}
                      {/* <td>
                          <button className="btn btn-sm mr-3 bg-red-600 text-white mt-2 p-2 rounded-md">
                              <IconLockSquareRounded size={18} strokeWidth={1.5} />
                          </button>
                      </td> */}
                  </tr>
              )) :  (<p>Oh, Aucune visite pour l'instant.</p>) 
              }
             
            </tbody>
        </table>
  

   );
}
 
export default PageScheduleList;