'use client'

import { Grid, Box } from "@mui/material";
import PageContainer from '@/app/admin/components/container/PageContainer';
// components
import SalesOverview from '@/app/admin/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/admin/components/dashboard/YearlyBreakup';
import Blog from '@/app/admin/components/dashboard/Blog';
import MonthlyEarnings from '@/app/admin/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <>
    <Box>
       <div className="bg-gradient-to-r  from-red-600 via-yellow-400 via-red-600 to-red-700 h-20 mx-auto rounded-md shadow-lg flex items-center justify-center text-center">
              <h1 className="text-2xl font-bold font-abril-fatface  text-black items-center justify-center text-center">Bienvenue dans l'administration.</h1>
        </div>
    </Box>
    <br />
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid> */}
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
    </>
  )
}

export default Dashboard;
