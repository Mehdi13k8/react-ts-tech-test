import { useState, useEffect } from "react";
import axios from "axios";

const CountriesAPI = "http://api.ratings.food.gov.uk/Countries/basic";

const useCountries = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(CountriesAPI, { headers: { "x-api-version": "2" } });
        setCountries(response.data.countries);
      } catch (err: any) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  return { countries, loading, error };
};

export default useCountries;
