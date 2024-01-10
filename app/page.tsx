import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
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
        <div className="bg-gradient-to-r pt-16 pb-4 from-red-600 via-yellow-400 via-red-600 to-red-700 h-40 mx-auto rounded-lg shadow-lg flex items-center justify-center text-center">
              <h1 className="text-3xl font-bold font-abril-fatface pt-6 text-black items-center justify-center text-center">Liste des sites touristiques de l&apos;Extrême-Nord</h1>
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


      {/* <Container>
          <div
            className="
                pt-16
                flex-row
                grid-rows-1 
                
            "
          > 
            <h1 className="font-bold text-blue-800">Liste des évènements</h1>
          </div>
      </Container> */}

      {/* <Container>
       
        <div 
          className="
            pt-15
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

         
           {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}

        </div>
      </Container> */}
    
    </ClientOnly>
  )
}

export default Home;
