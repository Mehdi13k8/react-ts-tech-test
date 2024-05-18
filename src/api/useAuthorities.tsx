import { useState, useEffect } from "react";
import axios from "axios";

const AuthoritiesAPI = "http://api.ratings.food.gov.uk/Authorities/basic";

const useAuthorities = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authorities, setAuthorities] = useState([]);

    useEffect(() => {
        const fetchAuthorities = async () => {
            try {
                const response = await axios.get(AuthoritiesAPI, { headers: { "x-api-version": "2" } });
                console.log(response);
                setAuthorities(response.data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorities();

        return () => {
        };
    }, []);

    return { authorities, loading, error };
};

export default useAuthorities;
