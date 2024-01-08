
import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
} from "@mui/material";

// Stack
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/app/admin/components/shared/BlankCard";
import Image from "next/image";

// Here import of images
const img1 : string = "https://res.cloudinary.com/dwbmmkqnl/image/upload/v1703859297/mo3ihe5qkobxyytzttev.jpg";
const img2 : string = "https://res.cloudinary.com/dwbmmkqnl/image/upload/v1703855974/uh5hscmlkeemh4y8flhk.jpg";
const img3 : string = "https://res.cloudinary.com/dwbmmkqnl/image/upload/v1702148836/o0uosg3jwlgwro9pxkwn.jpg";
const img4 : string = "https://res.cloudinary.com/dwbmmkqnl/image/upload/v1702151193/wztohesthfvlpeiq3btl.jpg";


const ecoCard = [
  {
    title: "Le mistery place",
    subheader: "14 juin, 2003",
    photo: img1,
    // salesPrice: 375,
    // price: 285,
    rating: 4,
  },
  {
    title: "Mayo Danay",
    subheader: "12 mai, 2005",
    photo: img2,
    // salesPrice: 650,
    // price: 900,
    rating: 5,
  },
  {
    title: "Logone et chari",
    subheader: "September 14, 1993",
    photo: img3,
    // salesPrice: 150,
    // price: 200,
    rating: 3,
  },
  {
    title: "Mayo kany",
    subheader: "10 janvier, 2003",
    photo: img4,
    // salesPrice: 285,
    // price: 345,
    rating: 2,
  },
];

const Blog = () => {
  return (
    <Grid container spacing={3}>
      {ecoCard.map((product, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} href="/">
              <Image
                src={product.photo}
                alt="img"
                width={400}
                height={400}
                style={{ width: "100%", height: "250px" }}
              />
            </Typography>
            <Tooltip title="Add To Cart">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: "75px", right: "15px", position: "absolute" }}
              >
                <IconBasket size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{product.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                {/* <Stack direction="row" alignItems="center">
                  <Typography variant="h6">${product.price}</Typography>
                  <Typography
                    color="textSecondary"
                    ml={1}
                    sx={{ textDecoration: "line-through" }}
                  >
                    ${product.salesPrice}
                  </Typography>
                </Stack> */}
                <Rating
                  name="read-only"
                  size="small"
                  value={product.rating}
                  readOnly
                />
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default Blog;
