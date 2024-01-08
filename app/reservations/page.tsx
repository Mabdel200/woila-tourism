import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationsClient";
import ListingEvent from "../components/listings/ListingEvent";
import getEvents from "../actions/getEvents";


const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  const eventsList = await getEvents({ authorId: currentUser.id });
  
  console.log(reservations);
  console.log(eventsList);

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Aucune reservation trouvée"
          subtitle="Il semble que vous n'ayez aucune réservation parmis les sites."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
      <ListingEvent 
           events={eventsList}     
      />
    </ClientOnly>
  );
}
 
export default ReservationsPage;
