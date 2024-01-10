'use client';
import { Typography, Grid, CardContent, Box } from '@mui/material';
import PageContainer from '@/app/admin/components/container/PageContainer';
import Button from '@/app/components/Button';
import useRentModal from '@/app/hooks/useRentModal';
import { IconCirclePlus } from '@tabler/icons-react';

import PageScheduleList from '@/app/admin/schedule/pageScheduleList'
import { useEffect, useState } from 'react';
import React from 'react';


async function getDatas() {
  const result = await fetch(`/api/reservations/`, { cache: 'no-store' });

  if(!result.ok) {
      throw new Error("Failed to fetch data")
  }

  return result.json();
}


const SchedulePage = () => {

  const [listOfSchedule, setListOfSchedule] = useState([]);

  // Use Effect To Set Data and don't use async to fix error.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDatas();
        setListOfSchedule(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  console.log("All Schedule :", listOfSchedule);

  return (
    <>
    <Box>
      <div className="bg-gradient-to-r  from-red-600 via-yellow-400 via-red-600 to-red-700 h-20 mx-auto rounded-md shadow-lg flex items-center justify-center text-center">
            <h1 className="text-2xl font-bold font-abril-fatface  text-black items-center justify-center text-center">Liste des planifications des visites</h1>
      </div>
    </Box>
    <PageContainer title="Visites" description="this is a scheduling page manager">
      <Grid container spacing={6}>
        <Grid item sm={12}>
          <div className="overflow-x-auto flex flex-col gap-4 mt-3">   
              <hr />         
              <PageScheduleList 
                  dataList={listOfSchedule}                
              />
          </div>
          {/* End of table */}
        </Grid>
      </Grid >
    </PageContainer>
    </>
  );
}

export default SchedulePage

