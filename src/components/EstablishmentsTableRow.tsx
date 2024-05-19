import React from "react";
import PropTypes from "prop-types";
import { FaHeart, FaHeartBroken, FaTrash } from "react-icons/fa";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
  onSelect: (id: string) => void;
  onFavorite: (establishment: { [key: string]: string }) => void;
  onNotFavorite: (establishment: { [key: string]: string }) => void;
  onRemove: (establishment: { [key: string]: string }) => void;
  flag: string;
}> = ({ establishment, onSelect, onFavorite, onNotFavorite, onRemove, flag }) => {

  console.log("Flagggs =>", flag);
  const tdStyleRedirect: { [key: string]: string | number } = {
    fontSize: "20px",
    cursor: "pointer",
    textDecoration: "underline",
    color: "blue"
  };
  const tdStyle: { [key: string]: string | number } = {
    fontSize: "20px"
  };

  const handleRowClick = () => {
    if (establishment?.FHRSID) {
      onSelect(establishment.FHRSID);
    }
  };

  return (
    <tr>
      <td style={tdStyleRedirect} onClick={handleRowClick}>{establishment?.BusinessName}</td>
      <td style={tdStyle}>{establishment?.RatingValue}</td>
      <td>
        {flag !== "favorite" && (
          <FaHeart
            style={{ cursor: "pointer", color: "red", marginRight: "10px" }}
            onClick={() => onFavorite(establishment)}
          />
        )}
        {flag !== "notFavorite" && (
          <FaHeartBroken
            style={{ cursor: "pointer", color: "black", marginRight: "10px" }}
            onClick={() => onNotFavorite(establishment)}
          />
        )}
        {flag && flag != "all" && (
          <button
            style={{
              background: "none",
              border: "none",
              color: flag === "favorite" ? "red" : "black",
              cursor: "pointer",
              fontSize: "20px"
            }}
            onClick={() => onRemove(establishment)}
          >
            <FaTrash />
          </button>
        )}
      </td>
    </tr>
  );
};

EstablishmentsTableRow.propTypes = {
  establishment: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onNotFavorite: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  flag: PropTypes.string.isRequired,
};
