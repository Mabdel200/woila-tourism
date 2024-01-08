'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'Artisanat',
    icon: BsSnow,
    description: 'cette categorie liste tous les sites artisanals de la ville de maroua ',
  },
  {
    label: 'Barrages',
    icon: TbPool,
    description: 'cette categorie liste tous les barrages de la ville de maroua ',
  },
  {
    label: 'Chefferies',
    icon: GiBarn,
    description: 'Cette categorie liste tous les Chefferies et palais de la region de l Extreme Nord!',
  },
  {
    label: 'Culturel',
    icon: GiWindmill,
    description: 'Cette categorie liste tous les centres culturels de la region de l Extreme Nord!',
  },
  {
    label: 'Habitats',
    icon: MdOutlineVilla,
    description: 'Cette categorie liste tous les habitats de la region de l Extreme Nord'
  },
  {
    label: 'Lacs',
    icon: TbMountain,
    description: 'Cette categorie liste tous les Lacs et Mares de la region de l Extreme Nord'
  },
  {
    label: 'Lamidat',
    icon: GiCastle,
    description: 'Cette categorie liste tous les lamidats de la region de l Extreme Nord'
  },
  {
    label: 'Marches',
    icon: TbPool,
    description: 'Cette categorie liste tous les marches de la region de l Extreme Nord'
  },
  {
    label: 'Monts',
    icon: TbPool,
    description: 'Cette categorie liste tous les cols, les pics, les grottes, les monts et les tours de la region de l Extreme Nord'
  },
  {
    label: 'Musees',
    icon: GiIsland,
    description: 'Cette categorie liste tous les Musees de la region de l Extreme Nord'
  },
  {
    label: 'Parcs',
    icon: GiBoatFishing,
    description: 'Cette categorie liste tous les parcs de la region de l Extreme Nord'
  },
  {
    label: 'Paysages',
    icon: GiForestCamp,
    description: 'Cette categorie liste tous les paysages de la region de l Extreme Nord'
  },
  {
    label: 'Villages',
    icon: GiCaveEntrance,
    description: 'Cette categorie liste tous les villages de la region de l Extreme Nord'
  },
  {
    label: 'Autres sites',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;