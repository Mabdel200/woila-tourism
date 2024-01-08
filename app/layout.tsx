import { Nunito } from 'next/font/google'

import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';
import { SessionProvider } from 'next-auth/react';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import Providers from './components/Providers';

export const metadata = {
  title: 'E-tourism',
  description: 'Plateforme de reservation des visites touristiques',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

interface RootLayoutProps {
  children: React.ReactNode;
}


export default async function RootLayout( {children}: RootLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <SearchModal />
            <RentModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
        </Providers>
        
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
