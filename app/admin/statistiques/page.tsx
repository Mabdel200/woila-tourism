'use client';
import { Typography, Grid, CardContent, Box } from '@mui/material';
import PageContainer from '@/app/admin/components/container/PageContainer';
// Get All Components for stats
import BarChart from "@/app/admin/statistiques/BarChart";
import DoughnutChart from  "@/app/admin/statistiques/DoughnutChart";
import LineChart from  "@/app/admin/statistiques/LineChart";
import PolarAreaChart from "@/app/admin/statistiques/PolarAreaChart";
import RadarChart from  "@/app/admin/statistiques/RadarChart";
import ScatterChart from  "@/app/admin/statistiques/ScatterChart";
import PieChart from  "@/app/admin/statistiques/pieChart";

import React from 'react';

const StactisticPage = () => {

  return (
    <>
    <Box>
      <div className="bg-gradient-to-r  from-red-600 via-yellow-400 via-red-600 to-red-700 h-20 mx-auto rounded-md shadow-lg flex items-center justify-center text-center">
            <h1 className="text-2xl font-bold font-abril-fatface  text-black items-center justify-center text-center">Statistiques</h1>
      </div>
    </Box>
    <PageContainer title="Site Touristique" description="this is tourism page manager">
      <Grid container spacing={4}>
        <Grid item sm={10}>
          <div className="flex flex-col gap-4 mt-3  ">
            <hr />
            <div>
        <h3>Bar Chart</h3>
        <BarChart />
      </div>
      <div>
        <h3>Pie Chart</h3>
        <PieChart />
      </div>
      <div>
        <h3>Doughnut Chart</h3>
        <DoughnutChart />
      </div>
      <div>
        <h3>Polar Area Chart</h3>
        <PolarAreaChart />
      </div>
      <div>
        <h3>Radar Chart</h3>
        <RadarChart />
      </div>
      <div>
        <h3>Line Chart</h3>
        <LineChart />
      </div>
      <div>
        <h3>Scatter Chart</h3>
        <ScatterChart />
      </div>
          </div>
          <hr />
          <br />

        </Grid>
      </Grid >
    </PageContainer>
    </>
  );
}

export default StactisticPage

