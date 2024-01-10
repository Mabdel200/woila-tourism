'use client';

import { SafeListing,  } from "@/app/types";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";


interface ListingSiteProps {
  dataList: SafeListing[];
}


const PageListingSite: React.FC<ListingSiteProps> = ({ 
    dataList,
 }) => {

  console.log(dataList);
  // Init router to refresh page
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Site supprimé');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);

  // UPDATES DATAS.
  // const [visibility, setVisibility] = useState(false)
  // const [listingToEdit, setListingToEdit] = useState(dataList);

  // const editForm = () => {
  //   setVisibility(visibility => !visibility)  
  // }
  // const handleEditSubmit = useCallback((id: string) => {
  //   setUpdateId(id);

  //   axios
  //     .patch(`/api/listings/${id}`, listingToEdit)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       router.refresh();
  //     });
  // }, [router]);
  
  return ( 
        <>
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
            {dataList && dataList.length > 0 ? dataList.map((listing, index) => (
              <tr key={listing.id} className="text-center">
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
                    </button>Voir l&apos;image
                  </a>
                </td>
                <td>
                  {/* Edit button */}
                  {/* <button  className="btn btn-sm mr-3 bg-blue-600 text-white mt-2 p-2 rounded-md">
                    <IconEdit size={18} strokeWidth={1.5} />
                  </button> */}
                  {/* Delete button */}
                  <button onClick={() => onDelete(listing.id)} disabled={deletingId === listing.id} className="btn btn-sm mr-3 bg-red-600 text-white mt-2 p-2 rounded-md">
                    <IconTrash size={18} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            )) : (<p>Oh, Aucun site disponible pour le moment.</p>)}

          </tbody>
        </table></>
  

   );
}
 
export default PageListingSite;