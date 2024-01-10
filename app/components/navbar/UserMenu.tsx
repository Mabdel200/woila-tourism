'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null
  adminUser?:SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser, adminUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
         <a href="/" className="
              hidden
              md:block
              text-sm 
              font-semibold 
              py-3 
              px-4 
              rounded-full 
              hover:bg-neutral-100 
              transition 
              cursor-pointer
            ">
            Accueil
          </a>

        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
          {currentUser ? (
              <>
                <MenuItem
                  label="Mes planifications"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="Mes sites favoris"
                  onClick={() => router.push('/favorites')}
                />
                <hr />
                <MenuItem label="Se déconnecter" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Connexion" onClick={loginModal.onOpen} />
                <MenuItem label="Inscription" onClick={registerModal.onOpen} />
              </>
            )}
            {/* For admin items */}
            {adminUser ? (
              <>
                {/* Admin-specific menu items */}
                <MenuItem
                  label="Vos sites touristiques"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label="Créer un nouveau site" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Se déconnecter" onClick={() => signOut()} />
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;