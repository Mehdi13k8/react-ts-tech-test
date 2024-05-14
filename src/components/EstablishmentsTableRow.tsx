export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {

  const tdStyle: { [key: string]: string | number } = {
    fontSize: "20px",
  };

  return (
    <tr>
      <td style={tdStyle}>{establishment?.BusinessName}</td>
      <td style={tdStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
