import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';


const img1 : string ="https://res.cloudinary.com/dwbmmkqnl/image/upload/v1702151193/wztohesthfvlpeiq3btl.jpg";

export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={2}
            sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
        >
            <>
                <Box>
                    <Typography variant="h6" mb={1}>Que souhaiter vous faire ?</Typography>
                    <Button color="primary" target="_blank" disableElevation component={Link} href="" variant="contained" aria-label="logout" size="small">
                        Ajouter un site Touristique 
                    </Button>
                </Box>
                <Box mt="-35px">
                    <Image alt="Remy Sharp" src={img1} width={100} height={100} />
                </Box>
            </>
        </Box>
    );
};
