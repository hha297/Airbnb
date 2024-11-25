import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
        value: country.cca2, // ISO 3166-1 alpha-2 code
        label: country.name.common, // Human name of the country
        flag: country.flag, // Flag of the country
        latlng: country.latlng, // Latitude and longitude of the country
        region: country.region, // Region of the country
}));

const useCountries = () => {
        const getAllCountries = () => formattedCountries;
        const getByValue = (value: string) => {
                return formattedCountries.find((item) => item.value === value);
        };
        return { getAllCountries, getByValue };
};

export default useCountries;
