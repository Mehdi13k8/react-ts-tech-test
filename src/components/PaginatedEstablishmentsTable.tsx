import { useState, useEffect } from "react";
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
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] =
    useState<{ message: string;[key: string]: string }>();
  const [establishments, setEstablishments] = useState<
    { [key: string]: string }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const { countries, loading: countriesLoading, error: countriesError }: { countries: CountriesType[], loading: boolean, error: any } = useCountries();
  // Authorities
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
          console.log(result);
          setLoading(false);
          setEstablishments(result?.establishments);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
    }
    else {
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
            <div style={{ marginBottom: "20px" }}>
              <AuthoritiesSelect authorities={authorities} onSelectAuthority={setSelectedAuthority} selectedAuthority={selectedAuthority} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <CountriesSelect countries={countries} onSelectCountry={setSelectedCountry} countrySelected={selectedCountry} />
            </div>
            <EstablishmentsTable establishments={establishments} />
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
