import React, { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings, getEstablishments, EstablishmentsType } from "../api/ratingsAPI";
import LoadingSpinner from "./loadingSpinner";
import useCountries from "../api/useCountries";
import useAuthorities from "../api/useAuthorities";
import { AuthoritiesSelect, CountriesSelect } from "./CustomSelects";
import { AuthorityType, CountriesType, AuthoritiesResponseType } from "../api/types";

const tableStyle = {
  background: "#82C7AF",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  overflow: "auto",
  maxHeight: "72vh",
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<{ message: string;[key: string]: string }>();
  const [establishments, setEstablishments] = useState<{ [key: string]: string }[]>([]);
  const [favorites, setFavorites] = useState<{ [key: string]: string }[]>([]);
  const [notFavorites, setNotFavorites] = useState<{ [key: string]: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const { countries, loading: countriesLoading, error: countriesError }: { countries: CountriesType[], loading: boolean, error: any } = useCountries();
  const { authorities, loading: authoritiesLoading, error: authoritiesError }: { authorities: AuthoritiesResponseType[], loading: boolean, error: any } = useAuthorities();
  const [selectedAuthority, setSelectedAuthority] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const queryParams = {
      pageNumber: pageNum,
      pageSize: 10,
      countryId: selectedCountry,
      localAuthorityId: selectedAuthority,
    };

    if (selectedCountry || selectedAuthority) {
      getEstablishments(queryParams).then(
        (result) => {
          setLoading(false);
          setEstablishments(result?.establishments);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
    } else {
      getEstablishmentRatings(pageNum).then(
        (result) => {
          setEstablishments(result.establishments);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
    }
  }, [selectedCountry, selectedAuthority, pageNum]);

  const handleFavorite = (establishment) => {
    setFavorites([...favorites, establishment]);
    setNotFavorites(notFavorites.filter((e) => e.FHRSID !== establishment.FHRSID));
  };

  const handleNotFavorite = (establishment) => {
    setNotFavorites([...notFavorites, establishment]);
    setFavorites(favorites.filter((e) => e.FHRSID !== establishment.FHRSID));
  };

  const handleRemove = (establishment: { [key: string]: string }) => {
    setFavorites(favorites.filter((e) => e.FHRSID !== establishment.FHRSID));
    setNotFavorites(notFavorites.filter((e) => e.FHRSID !== establishment.FHRSID));
    // setEstablishments([...establishments, establishment]);
  };

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    setLoading(true);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setEstablishments(result.establishments);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    );
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    setLoading(true);
    getEstablishmentRatings(pageNum).then(
      (result) => {
        setLoading(false);
        setEstablishments(result.establishments);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        {loading && (
          <div className="loading-spinner">
            <LoadingSpinner />
          </div>
        )}
        {!loading && (
          <>
            {!selectedAuthority && (
              <div style={{ marginBottom: "20px" }}>
                <CountriesSelect countries={countries} onSelectCountry={setSelectedCountry} selectedCountry={selectedCountry} />
              </div>
            )}
            {!selectedCountry && (
              <div style={{ marginBottom: "20px" }}>
                <AuthoritiesSelect authorities={authorities} onSelectAuthority={setSelectedAuthority} selectedAuthority={selectedAuthority} />
              </div>
            )}
            <EstablishmentsTable
              establishments={establishments}
              onFavorite={handleFavorite}
              onNotFavorite={handleNotFavorite}
              onRemove={handleRemove}
              flag="all"
            />
            {notFavorites.length === 0 && <p>No Not Favorites</p>}
            {notFavorites.length > 0 && (
              <>
                <h3>Not Favorites</h3>
                <EstablishmentsTable
                  establishments={notFavorites}
                  onFavorite={handleFavorite}
                  onNotFavorite={handleNotFavorite}
                  onRemove={handleRemove}
                  flag="notFavorite"
                />
              </>
            )}

            {favorites.length === 0 && <p>No Favorites</p>}
            {favorites.length > 0 && (
              <>
                <h3>Favorites</h3>
                <EstablishmentsTable
                  establishments={favorites}
                  onFavorite={handleFavorite}
                  onNotFavorite={handleNotFavorite}
                  onRemove={handleRemove}
                  flag="favorite"
                />
              </>
            )}
            <EstablishmentsTableNavigation
              pageNum={pageNum}
              pageCount={pageCount}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </>
        )}
      </div>
    );
  }
};
