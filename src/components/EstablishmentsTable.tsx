import React, { useState } from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import EstablishmentDetails from "./EstablishmentDetails";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: { [key: string]: string }[] | null | undefined;
  onFavorite: (establishment: { [key: string]: string }) => void;
  onNotFavorite: (establishment: { [key: string]: string }) => void;
  onRemove: (establishment: { [key: string]: string }) => void;
  flag: string;
}> = ({ establishments, onFavorite, onNotFavorite, onRemove, flag }) => {
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState<string | null>(null);
  const handleSelect = (id: string) => {
    setSelectedEstablishmentId(id);
  };

  const handleBack = () => {
    setSelectedEstablishmentId(null);
  };

  return (
    <div>
      {selectedEstablishmentId ? (
        <EstablishmentDetails id={selectedEstablishmentId} onBack={handleBack} />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Rating Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {establishments && establishments.map((establishment) => (
              <EstablishmentsTableRow
                key={establishment.FHRSID}
                establishment={establishment}
                onSelect={handleSelect}
                onFavorite={onFavorite}
                onNotFavorite={onNotFavorite}
                onRemove={onRemove}
                flag={flag}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
  onFavorite: PropTypes.func.isRequired,
  onNotFavorite: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
