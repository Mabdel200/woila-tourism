'use client';

import { SafeEvent,  } from "@/app/types";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";


const PageEventList = ({ 
    dataList,
 }) => {

  console.log(dataList);

  return ( 
   
        <table className="table table-auto hover:table-fixed w-auto border-collapse border border-slate-400">
            <thead>
              <tr>
                    <th className="border border-slate-300">N°</th>
                    <th className="border border-slate-300">Thème</th>
                    <th className="border border-slate-300">Description</th>
                    <th className="border border-slate-300">Date de création</th>
                    <th className="border border-slate-300">Date de debut</th>
                    <th className="border border-slate-300">Date de fin</th>
                    {/* <th className="border border-slate-300">Site concerné</th> */}
                    <th className="border border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              { dataList &&  dataList.length > 0 ?   dataList.map((event, index) => (
                  <tr  key={event.id} className="text-center" >
                      <td className="border border-slate-300">{index + 1}</td>
                      <td className="border border-slate-300">{event.title}</td>
                      <td className="border border-slate-300">{event.description}</td>
                      <td className="border border-slate-300">{event.createdAt}</td>
                      <td className="border border-slate-300">{event.startDate}</td>
                      <td className="border border-slate-300">{event.endDate}</td>

                      {/* <td className="border border-slate-300">{event.listing}</td> */}
                      <td>

                          <button className="btn btn-sm mr-3 bg-blue-600 text-white mt-2 p-2 rounded-md">
                              <IconEdit size={18} strokeWidth={1.5} />
                          </button>
                          <button className="btn btn-sm mr-3 bg-red-600 text-white mt-2 p-2 rounded-md">
                              <IconTrash size={18} strokeWidth={1.5} />
                          </button>
                      </td>
                  </tr>
              )) :  (<p>Oh, Aucun évènement en cours.</p>) 
              }
             
            </tbody>
        </table>
  

   );
}
 
export default PageEventList;