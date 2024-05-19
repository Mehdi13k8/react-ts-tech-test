import React, { useEffect, useState } from "react";

export type EstablishmentType = {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  BusinessName: string;
  BusinessType: string;
  BusinessTypeID: number;
  ChangesByServerID: number;
  Distance: number;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  LocalAuthorityCode: string;
  LocalAuthorityEmailAddress: string;
  LocalAuthorityName: string;
  LocalAuthorityWebSite: string;
  NewRatingPending: boolean;
  Phone: string;
  PostCode: string;
  RatingDate: Date;
  RatingKey: string;
  RatingValue: string;
  RightToReply: string;
  SchemeType: string;
  geocode: {
    longitude: string;
    latitude: string;
  };
  scores: {
    Hygiene: number | null;
    Structural: number | null;
    ConfidenceInManagement: number | null;
  };
};

const getEstablishmentDetails = async (id: string): Promise<EstablishmentType> => {
  const response = await fetch(`http://api.ratings.food.gov.uk/Establishments/${id}`, {
    headers: {
      "x-api-version": "2",
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const EstablishmentDetails: React.FC<{ id: string; onBack: () => void }> = ({ id, onBack }) => {
  const [establishment, setEstablishment] = useState<EstablishmentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEstablishmentDetails(id)
      .then((data) => {
        setEstablishment(data);
        setLoading(false);
        console.log("establishment =>", establishment);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <button onClick={onBack}>Back</button>
      <h1>{establishment?.BusinessName}</h1>
      <p>{establishment?.AddressLine1}</p>
      <p>{establishment?.AddressLine2}</p>
      <p>{establishment?.AddressLine3}</p>
      <p>{establishment?.AddressLine4}</p>
      <p>{establishment?.PostCode}</p>
      <p>{establishment?.Phone}</p>
      <p>{establishment?.RatingValue}</p>
      {/* format date dd/mm/yy */}
      <p> {
        new Date(establishment?.RatingDate as Date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      }</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default EstablishmentDetails;
