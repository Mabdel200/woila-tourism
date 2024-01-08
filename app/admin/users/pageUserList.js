'use client';

import {  IconTrash, IconLockSquareRounded } from "@tabler/icons-react";


const PageUserList = ({ 
    dataList,
 }) => {

  console.log(dataList);

  return ( 
   
        <table className="table table-auto hover:table-fixed w-auto border-collapse border border-slate-400">
            <thead>
              <tr>
                    <th className="border border-slate-300">N°</th>
                    <th className="border border-slate-300">Noms</th>
                    <th className="border border-slate-300">Email</th>
                    <th className="border border-slate-300">Date de création</th>
                    <th className="border border-slate-300">Role</th>
                    {/* <th className="border border-slate-300">Site concerné</th> */}
                    <th className="border border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              { dataList &&  dataList.length > 0 ?   dataList.map((user, index) => (
                  <tr  key={user.id} className="text-center" >
                      <td className="border border-slate-300">{index + 1}</td>
                      <td className="border border-slate-300">{user.name}</td>
                      <td className="border border-slate-300">{user.email}</td>
                      <td className="border border-slate-300">{user.createdAt}</td>
                      <td className="border border-slate-300">{user.role}</td>
                     
                      {/* <td className="border border-slate-300">{event.listing}</td> */}
                      <td>
                          <button className="btn btn-sm mr-3 bg-red-600 text-white mt-2 p-2 rounded-md">
                              <IconLockSquareRounded size={18} strokeWidth={1.5} />
                          </button>
                      </td>
                  </tr>
              )) :  (<p>Oh, Aucun utilisateurs pour l'instant.</p>) 
              }
             
            </tbody>
        </table>
  

   );
}
 
export default PageUserList;