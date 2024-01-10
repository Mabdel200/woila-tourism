// useCountries.ts

// Importez les types et bibliothèques nécessaires
import countries from 'world-countries';

// Définissez le type CountrySelectValue
// type CountrySelectValue = {
//   value: string;
//   label: string;
//   flag: string;
//   latlng: [number, number];
//   region: string;
// };

// Formatez les pays avec le type CountrySelectValue
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));


const useCountries = () => {

  const getAll = () => ({
    options: formattedCountries,
  });

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};


export default useCountries;
