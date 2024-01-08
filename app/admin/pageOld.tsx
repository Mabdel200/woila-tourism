import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface HomeAdminProps {
  searchParams: IListingsParams
};

const HomeAdmin = async ({ searchParams }: HomeAdminProps) => {
  //Use session
  const  session = await getServerSession(authOptions)
  if (session?.user.role !== "ADMIN"){
    throw new Error("Vous devez etre un administrateur pour accéder a cette page.")
  }

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    
    <ClientOnly>

      <Container>
        <div className="bg-gradient-to-r  from-red-600 via-yellow-400 via-red-600 to-red-700 h-20 mx-auto rounded-lg shadow-lg flex items-center justify-center text-center">
              <h1 className="text-3xl font-bold font-abril-fatface  text-black items-center justify-center text-center">Bienvenue dans l'administration.</h1>
        </div>
      </Container>
      
      <Container>
      <br /><br />
        <div 
          className="
            pt-18
     
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
           
          {/* List of sites  */}
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}

        </div>
      </Container>
    
    </ClientOnly>
  )
}

export default HomeAdmin;
