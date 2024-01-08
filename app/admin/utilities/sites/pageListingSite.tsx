'use client';

import { SafeListing,  } from "@/app/types";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";


interface ListingSiteProps {
  dataList: SafeListing[];
}


const PageListingSite: React.FC<ListingSiteProps> = ({ 
    dataList,

 }) => {

  console.log(dataList);

  return ( 
   
        <table className="table table-auto hover:table-fixed w-auto border-collapse border border-slate-400">
            <thead>
              <tr>
                    <th className="border border-slate-300">N°</th>
                    <th className="border border-slate-300">Nom</th>
                    <th className="border border-slate-300">Description</th>
                    <th className="border border-slate-300">Catégorie</th>
                    <th className="border border-slate-300">Date de création</th>
                    <th className="border border-slate-300">Localisation</th>
                    <th className="border border-slate-300">Image</th>
                    <th className="border border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              { dataList &&  dataList.length > 0 ?   dataList.map((listing, index) => (
                  <tr  key={listing.id} className="text-center" >
                      <td className="border border-slate-300">{index + 1}</td>
                      <td className="border border-slate-300">{listing.title}</td>
                      <td className="border border-slate-300">{listing.description}</td>
                      <td className="border border-slate-300">{listing.category}</td>
                      <td className="border border-slate-300">{listing.createdAt}</td>
                      <td className="border border-slate-300">{listing.locationValue}</td>
                      <td className="border border-slate-300">
                     
                        <a href={listing.imageSrc} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                          <button className="btn btn-sm mr-3 bg-purple-600 text-white mt-2 p-2 rounded-md">
                             <IconEye size={20} strokeWidth={2} /> 
                          </button>Voir l'image
                        </a>
                      </td>
                      <td>

                          <button className="btn btn-sm mr-3 bg-blue-600 text-white mt-2 p-2 rounded-md">
                              <IconEdit size={18} strokeWidth={1.5} />
                          </button>
                          <button className="btn btn-sm mr-3 bg-red-600 text-white mt-2 p-2 rounded-md">
                              <IconTrash size={18} strokeWidth={1.5} />
                          </button>
                      </td>
                  </tr>
              )) :  (<p>Oh, Aucun site disponible pour le moment.</p>) 
              }
             
            </tbody>
        </table>
  

   );
}
 
export default PageListingSite;