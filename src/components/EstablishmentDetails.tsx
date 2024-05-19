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
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBack}>Back</button>
      <h1 style={styles.header}>{establishment?.BusinessName}</h1>
      <div style={styles.infoContainer}>
        <div style={styles.infoSection}>
          <h2 style={styles.subHeader}>Address</h2>
          <p>{establishment?.AddressLine1}</p>
          <p>{establishment?.AddressLine2}</p>
          <p>{establishment?.AddressLine3}</p>
          <p>{establishment?.AddressLine4}</p>
          <p>{establishment?.PostCode}</p>
        </div>
        <div style={styles.infoSection}>
          <h2 style={styles.subHeader}>Contact</h2>
          <p><strong>Phone:</strong> {establishment?.Phone}</p>
          <p><strong>Email:</strong> {establishment?.LocalAuthorityEmailAddress}</p>
          <p><strong>Website:</strong> <a href={establishment?.LocalAuthorityWebSite} target="_blank" rel="noopener noreferrer">{establishment?.LocalAuthorityWebSite}</a></p>
        </div>
        <div style={styles.infoSection}>
          <h2 style={styles.subHeader}>Rating</h2>
          <p><strong>Value:</strong> {establishment?.RatingValue}</p>
          <p><strong>Date:</strong> {
            new Date(establishment?.RatingDate as Date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          }</p>
        </div>
        <div style={styles.infoSection}>
          <h2 style={styles.subHeader}>Scores</h2>
          <p><strong>Hygiene:</strong> {establishment?.scores.Hygiene ?? "N/A"}</p>
          <p><strong>Structural:</strong> {establishment?.scores.Structural ?? "N/A"}</p>
          <p><strong>Confidence in Management:</strong> {establishment?.scores.ConfidenceInManagement ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  backButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "4px",
    marginBottom: "20px",
    fontSize: "16px",
  },
  header: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  infoContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  subHeader: {
    fontSize: "24px",
    borderBottom: "2px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
};

export default EstablishmentDetails;
