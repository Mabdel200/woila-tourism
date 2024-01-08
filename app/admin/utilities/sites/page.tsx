'use client';
import { Typography, Grid, CardContent, Box } from '@mui/material';
import PageContainer from '@/app/admin/components/container/PageContainer';
import Button from '@/app/components/Button';
import useRentModal from '@/app/hooks/useRentModal';
import { IconCirclePlus } from '@tabler/icons-react';
// Get All listing Sites
import getListings, { IListingsParams } from "@/app/actions/getListings";
import { useEffect, useState } from 'react';
import { SafeListing } from '@/app/types';
import axios from 'axios';
import PageListingSite from './pageListingSite';
import React from 'react';

async function getDatas() {
  const result = await fetch(`/api/listings/`, { cache: 'no-store' });

  if(!result.ok) {
      throw new Error("Failed to fetch data")
  }

  return result.json();
}

const SitesPage = () => {

  const [listeOfSites, setListOfSites] = useState([]);

  // Use Effect To Set Data and don't use async to fix error.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDatas();
        setListOfSites(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const rentModal = useRentModal();
  console.log("All listing sites :", listeOfSites);

  return (
    <>
    <Box>
      <div className="bg-gradient-to-r  from-red-600 via-yellow-400 via-red-600 to-red-700 h-20 mx-auto rounded-md shadow-lg flex items-center justify-center text-center">
            <h1 className="text-2xl font-bold font-abril-fatface  text-black items-center justify-center text-center">Géré un site touristique</h1>
      </div>
    </Box>
    <PageContainer title="Site Touristique" description="this is tourism page manager">
      <Grid container spacing={6}>
        <Grid item sm={12}>
          <div className="flex flex-col gap-4 mt-3 w-1/3 ">
            <hr />
            <Button 
              // outline
              label="Ajouter un site touristique"
              icon={IconCirclePlus}
              onClick={rentModal.onOpen}
              
            />
          </div>
          <hr />
          <br />
          <div className="overflow-x-auto">            
              <PageListingSite 
                  dataList={listeOfSites}                
              />
          </div>
          {/* End of table */}
        </Grid>
      </Grid >
    </PageContainer>
    </>
  );
}

export default SitesPage

