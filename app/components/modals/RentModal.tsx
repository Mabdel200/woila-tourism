'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  // INFO = 2,
  IMAGES = 2,
  DESCRIPTION = 3,
  // PRICE = 4,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: 'CM',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      department:'diamare',
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const department = watch('department');
  // const guestCount = watch('guestCount');
  // const roomCount = watch('roomCount');
  // const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Site touristique créer!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Oups un problème est survenu.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return 'Créer'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);


  const categorySelection = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
      {categories.map((item) => (
        <div key={item.label} className="col-span-1">
          <CategoryInput
            onClick={(category) => setCustomValue('category', category)}
            selected={category === item.label}
            label={item.label}
            icon={item.icon}
          />
        </div>
      ))}
    </div>
  );

  let bodyContent: React.ReactNode = <div />;
  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="De quel catégorie de site s'agit-il ?"
            subtitle="Choisissez une categorie"
          />
          {categorySelection}
        </div>
      );
      break;

    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Quelle est la localisation du site?"
            subtitle="Sélectionner son departement!"
          />
          <CountrySelect 
            value={location} 
            onChange={(value) => setCustomValue('location', value)} 
          />
          <Map center={location?.latlng} />
        </div>
      );
      break;

    case STEPS.IMAGES:
      bodyContent = (
            <div className="flex flex-col gap-8">
              <Heading
                title="Ajoutez une image pour votre site touristique"
                subtitle="Montrer aux visiteurs un apercu du site a visiter!"
              />
              <ImageUpload
                onChange={(value) => setCustomValue('imageSrc', value)}
                value={imageSrc}
              />
            </div>
        )
      break;

    case STEPS.DESCRIPTION:
         bodyContent = (
            <div className="flex flex-col gap-8">
              <Heading
                title="Comment decririez-vous le site touristique?"
                subtitle="Courte description!"
              />
              <Input
                id="title"
                label="Nom du site"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <hr />
              <Input
                id="description"
                label="Description du site"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <hr />
              <Input
                id="department"
                label="Nom du département"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          
    )
      break;

    default:
      break;
  }

  // let bodyContent = (
  //   <div className="flex flex-col gap-8">
  //     <Heading
  //       title="De quel catégorie de site s'agit-il ?"
  //       subtitle="Choisissez une categorie"
  //     />
  //     <div 
  //       className="
  //         grid 
  //         grid-cols-1 
  //         md:grid-cols-2 
  //         gap-3
  //         max-h-[50vh]
  //         overflow-y-auto
  //       "
  //     >
  //       {categories.map((item) => (
  //         <div key={item.label} className="col-span-1">
  //           <CategoryInput
  //             onClick={(category) => 
  //               setCustomValue('category', category)}
  //             selected={category === item.label}
  //             label={item.label}
  //             icon={item.icon}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )

  // if (step === STEPS.LOCATION) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Quelle est la localisation du site?"
  //         subtitle="Sélectionner son departement!"
  //       />
  //       <CountrySelect 
  //         value={location} 
  //         onChange={(value) => setCustomValue('location', value)} 
         
  //       />
  //       <Map center={location?.latlng} />
  //     </div>
  //   );
  // }

  // if (step === STEPS.INFO) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Share some basics about your place"
  //         subtitle="What amenitis do you have?"
  //       />
  //       <Counter 
  //         onChange={(value) => setCustomValue('guestCount', value)}
  //         value={guestCount}
  //         title="Guests" 
  //         subtitle="How many guests do you allow?"
  //       />
  //       <hr />
  //       <Counter 
  //         onChange={(value) => setCustomValue('roomCount', value)}
  //         value={roomCount}
  //         title="Rooms" 
  //         subtitle="How many rooms do you have?"
  //       />
  //       <hr />
  //       <Counter 
  //         onChange={(value) => setCustomValue('bathroomCount', value)}
  //         value={bathroomCount}
  //         title="Bathrooms" 
  //         subtitle="How many bathrooms do you have?"
  //       />
  //     </div>
  //   )
  // }

  // if (step === STEPS.IMAGES) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Ajoutez une image pour votre site touristique"
  //         subtitle="Montrer aux visiteurs un apercu du site a visiter!"
  //       />
  //       <ImageUpload
  //         onChange={(value) => setCustomValue('imageSrc', value)}
  //         value={imageSrc}
  //       />
  //     </div>
  //   )
  // }

  // if (step === STEPS.DESCRIPTION) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Comment decririez-vous le site touristique?"
  //         subtitle="Courte description!"
  //       />
  //       <Input
  //         id="title"
  //         label="Nom du site"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //       <hr />
  //       <Input
  //         id="description"
  //         label="Description du site"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //       <hr />
  //        <Input
  //         id="department"
  //         label="Nom du département"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
      
  //   )
  // }

  // if (step === STEPS.PRICE) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Now, set your price"
  //         subtitle="How much do you charge per night?"
  //       />
  //       <Input
  //         id="price"
  //         label="Price"
  //         formatPrice 
  //         type="number" 
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   )
  // }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="E-tourisme!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;
