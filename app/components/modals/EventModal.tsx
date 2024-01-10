'use client';

import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";


import useEventModal from "@/app/hooks/useEventModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Heading from "../Heading";
import Button from "../Button";

const EventModal= () => {
  const eventModal = useEventModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      listingId:'6582b1146553006b1f765d8a'
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Form Data:', data);
    setIsLoading(true);
  
    try {
      const response = await axios.post('/api/events', data);
      const eventData = response.data;
  
      console.log("API Response:", eventData);
      toast.success('Evenement créé avec succès!');
      eventModal.onClose();
    } catch (error) {
      const errorMessage =  'Une erreur est survenue';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  const onToggle = useCallback(() => {
    eventModal.onClose();
  }, [eventModal])

  // Update state for Select options:
  const [siteOptions, setSiteOptions] = useState([]);

  useEffect(() => {
    // Fetch site options from an API endpoint or set them statically
    const fetchSiteOptions = async () => {
      // Example: Fetch options from an API
      const response = await axios.get('/api/listings');
      console.log(response);
      setSiteOptions(response.data);
   
    };

    fetchSiteOptions();
  }, []);

  const onSelectChange = (e: { target: { value: any; }; }) => {
    console.log('Selected Listing ID:', e.target.value);
  }


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Content de vous revoir"
        subtitle="Quel évènement souhaitez-vous enregistrer ?"
      />
      <Input
        id="title"
        label="Thème"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="startDate"
        label="Date de debut"
        type="date"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="endDate"
        label="Date de fin"
        type="date"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {siteOptions && siteOptions.length > 0 ? (
        <Select
          id="listingId"
          label="Site Touristique"
          disabled={isLoading}
          options={siteOptions}
          register={register}
          errors={errors}
        />
      ) : (
        <p>Loading site options...</p>
      )}
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">  
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          <span 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Powered by mister-abz from woila-tourism</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={eventModal.isOpen}
      title="Création d'un évènement"
      actionLabel="Enregistrer"
      onClose={eventModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default EventModal;
