'use client';

import { useCallback, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react';

import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}


const LoginModal = ({ searchParams }: IProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  // console.log(session?.user);
  
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  // Fonction verification roleUser
  useEffect(() => {
    // Vérifiez si la session est chargée et que la connexion est réussie
    if (status === "authenticated" && session?.user?.role) {
      let isMounted = true;
      toast.success("Connecté avec succès");

      // Accédez au rôle de l'utilisateur à partir de la session mise à jour
      const userRole = session.user.role;

      if (userRole === "ADMIN" && isMounted) {
        router.push("/admin");
      } else if (isMounted) {
        router.refresh();
      }
    // Nettoyez l'état lorsque le composant est démonté
    return () => {
      isMounted = false;
    };

   
    }
  }, [status, session, router]);


  
  const onSubmit: SubmitHandler<FieldValues> = 
  (data) => {
    setIsLoading(true);

    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);
      // Make Controls of redirection
      console.log(callback);
      
    });
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])
  // Params controls
  {searchParams?.message && <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">{searchParams?.message}</p>}
 
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Content de vous revoir"
        subtitle="Connectez-vous à votre compte!"
      />
      <Input
        id="email"
        label="Adresse mail"
        disabled={isLoading}
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Mot de passe"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continuer avec Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      {/* <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      /> */}
      <div className="
      text-neutral-500 text-center mt-4 font-light">
        <p>Vous n'avez pas de compte?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Créer un compte</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Se connecter"
      actionLabel="Se connecter"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
