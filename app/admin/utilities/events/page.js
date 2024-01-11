'use client';
import { Typography, Grid, CardContent, Box } from '@mui/material';
import PageContainer from '@/app/admin/components/container/PageContainer';
import Button from '@/app/components/Button';
import useEventModal from '@/app/hooks/useEventModal';
import { IconCirclePlus } from '@tabler/icons-react';

import PageEventList from '@/app/admin/utilities/events/pageEventList'
import { useEffect, useState, useCallback } from 'react';
import React from 'react';


async function getDatas() {
  const result = await fetch(`/api/events/`, { cache: 'no-store' });

  if(!result.ok) {
      throw new Error("Failed to fetch data")
  }

  return result.json();
}

const EventPage = () => {

  const [listOfEvents, setListOfEvent] = useState([]);

  // Use Effect To Set Data and don't use async to fix error.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDatas();
        setListOfEvent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const eventModal = useEventModal();


  return (
    <>
    <Box>
      <div className="bg-gradient-to-r  from-red-600 via-yellow-400 via-red-600 to-red-700 h-20 mx-auto rounded-md shadow-lg flex items-center justify-center text-center">
            <h1 className="text-2xl font-bold font-abril-fatface  text-black items-center justify-center text-center">Gérér les évènements</h1>
      </div>
    </Box>
    <PageContainer title="Evenement" description="this is event page manager">
      <Grid container spacing={6}>
        <Grid item sm={12}>
          <div className="flex flex-col gap-4 mt-3 w-1/3 ">
              <hr />
              <Button 
                // outline
                label="Ajouter un évènement"
                icon={IconCirclePlus}
                onClick={ eventModal.onOpen }
                
              />
          </div>
          <hr />
          <br />
          <div className="overflow-x-auto">            
              <PageEventList 
                  dataList={listOfEvents}                
              />
          </div>
          {/* End of table */}
        </Grid>
      </Grid >
    </PageContainer>
    </>
  );
}

export default EventPage

